/**
 * This migration file was created to migrate employees data from the old system to the new one.
 */

/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-console,no-await-in-loop */
const { createClient: createSDKClient } = require("contentful");
const { createClient } = require("contentful-management");
require("dotenv/config");

const oldModelCredentials = {
  space: process.env.CONTENTFUL_OLD_SPACE_ID,
  accessToken: process.env.CONTENTFUL_OLD_DELIVERY_ACCESS_TOKEN,
};

const mainModelCredentials = {
  space: process.env.CONTENTFUL_MAIN_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN,
  managementAccessToken: process.env.CONTENTFUL_MAIN_MANAGEMENT_ACCESS_TOKEN,
};

const oldClient = createSDKClient(oldModelCredentials);

const getOldEmployeesData = async () => {
  const res = await oldClient.getEntries({ content_type: "vet", limit: 500 });
  return res.items;
};

getOldEmployeesData().then(oldModelEmployees => {
  console.log(
    `[${new Date().toISOString()}]: sending in`,
    oldModelEmployees.length,
    "employees"
  );

  const mainClient = createClient({
    accessToken: mainModelCredentials.managementAccessToken,
  });

  async function populateData(oldModelEmployee) {
    const space = await mainClient.getSpace(mainModelCredentials.space);
    const environment = await space.getEnvironment("master");

    /**
     * Entry creation without publish
     */
    const entry = await environment.createEntry("collection__employees", {
      fields: {
        name: {
          de: oldModelEmployee.fields.name,
        },
        jobTitle: { de: oldModelEmployee.fields.jobTitle },
        role: { de: oldModelEmployee.fields.role },
        quote: { de: oldModelEmployee.fields.bioIntro },
        bio: { de: oldModelEmployee.fields.bioIntro },
        image: {
          de: {
            sys: {
              linkType: "Asset",
              type: "Link",
            },
          },
        },
      },
      metadata: {
        tags: [],
      },
    });

    /**
     * Asset creation and publish
     */

    if (oldModelEmployee.fields.photo && oldModelEmployee.fields.photo.fields) {
      let asset = await environment.createAsset({
        fields: {
          title: {
            de: oldModelEmployee.fields.photo.fields.title,
          },
          file: {
            de: {
              contentType:
                oldModelEmployee.fields.photo.fields.file.contentType,
              fileName: oldModelEmployee.fields.photo.fields.file.fileName,
              upload: `https:${oldModelEmployee.fields.photo.fields.file.url}`,
            },
          },
        },
      });
      // reassign `asset` to have the latest version number
      asset = await asset.processForAllLocales();
      asset = await asset.publish();

      /**
       * Update entry with new asset
       */
      entry.fields.image.de = {
        sys: {
          id: asset.sys.id,
          linkType: "Asset",
          type: "Link",
        },
      };
      return entry.update();
    }

    return entry;
  }

  const timer = ms => new Promise(res => setTimeout(res, ms));

  async function run() {
    // Sending the data in batches of 5 because of the rate limit of the API
    const chunkSize = 5;
    for (let i = 0; i < oldModelEmployees.length; i += chunkSize) {
      const chunk = oldModelEmployees.slice(i, i + chunkSize);
      await Promise.all(chunk.map(populateData));
      console.log(`[${new Date().toISOString()}]: done iteration --->`, i);
      await timer(2000);
    }
  }

  run()
    .then(() => {
      console.log("done");
    })
    .catch(err => {
      console.log(err);
    });
});
