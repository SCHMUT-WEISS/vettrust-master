/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-console,no-await-in-loop,no-restricted-syntax */

/**
 * This script changes the description of employees images to Portrait {Employee Name}
 */

const { createClient } = require("contentful");
const {
  createClient: createManagementClient,
} = require("contentful-management");
require("dotenv/config");

const mainModelCredentials = {
  space: process.env.CONTENTFUL_MAIN_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN,
  managementAccessToken: process.env.CONTENTFUL_MAIN_MANAGEMENT_ACCESS_TOKEN,
};

const mainClient = createClient({
  space: process.env.CONTENTFUL_MAIN_SPACE_ID,
  accessToken: mainModelCredentials.accessToken,
});

const managementClient = createManagementClient({
  accessToken: mainModelCredentials.managementAccessToken,
});

const timer = ms => new Promise(res => setTimeout(res, ms));

async function generateEmployeesDescriptions() {
  // const space = await mainClient.getSpace(mainModelCredentials.space);
  // const environment = await space.getEnvironment("master");
  const assets = await mainClient.getEntries({
    content_type: "collection__employees",
    locale: "*",
    // select: "fields.image,fields.name,fields.image.de.sys",
    include: 3,
    limit: 1000,
  });

  // Sending the data in batches of 5 because of the rate limit of the API
  const chunkSize = 5;
  for (let i = 0; i < assets.items.length; i += chunkSize) {
    const chunk = assets.items.slice(i, i + chunkSize);
    for (const asset of chunk) {
      const imageid = asset.fields.image.de.sys.id;
      const space = await managementClient.getSpace(mainModelCredentials.space);
      const environment = await space.getEnvironment("master");
      const image = await environment.getAsset(imageid);

      if (image) {
        const description = `Portrait ${asset.fields.name.de}`;
        image.fields.description = {
          "en-US": description,
          de: description,
        };
        try {
          await image.update();
        } catch (e) {
          console.log("asset failed", asset.fields.name);
          console.log(e);
        }

        console.log(
          `[${new Date().toISOString()}]: done for ---> ${
            asset.fields.name.de
          }}`,
          i + chunkSize
        );
      }
    }

    console.log(
      `[${new Date().toISOString()}]: done chunk --->`,
      i + chunkSize
    );
    await timer(2500);
  }

  console.log(`[${new Date().toISOString()}]: done offset --->`);
  return assets.total;
}

generateEmployeesDescriptions();
