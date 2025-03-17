/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-console,no-await-in-loop,no-restricted-syntax */

/**
 * This migration script adds the french locale to all images
 */

const { createClient } = require("contentful-management");

require("dotenv/config");

const mainModelCredentials = {
  space: process.env.CONTENTFUL_MAIN_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN,
  managementAccessToken: process.env.CONTENTFUL_MAIN_MANAGEMENT_ACCESS_TOKEN,
};

const mainClient = createClient({
  accessToken: mainModelCredentials.managementAccessToken,
});

const timer = ms => new Promise(res => setTimeout(res, ms));

async function generateFrenchLocale(offset = 0) {
  const space = await mainClient.getSpace(mainModelCredentials.space);
  const environment = await space.getEnvironment("master");
  const assets = await environment.getAssets({
    limit: 1000,
    skip: offset,
  });

  // Sending the data in batches of 5 because of the rate limit of the API
  const chunkSize = 5;
  for (let i = 0; i < assets.items.length; i += chunkSize) {
    const chunk = assets.items.slice(i, i + chunkSize);

    for (const asset of chunk) {
      const image = asset?.fields?.file?.de;
      if (image) {
        asset.fields.file = {
          "en-US": image,
          de: image,
          fr: image,
        };
        try {
          await asset.update();
        } catch (e) {
          console.log("asset failed", asset.fields.name);
          console.log(e);
        }
      }
    }

    console.log(
      `[${new Date().toISOString()}]: done iteration --->`,
      i + chunkSize
    );
    await timer(2500);
  }

  console.log(`[${new Date().toISOString()}]: done offset --->`, offset + 1000);
  return assets.total;
}

async function main() {
  let offset = 0;
  let total = 1000;

  while (offset < total) {
    total = await generateFrenchLocale(offset);
    offset += 1000;
  }
}

main()
  .then(() => console.log("Done populating French locale to images"))
  .catch(error => {
    console.log("Error populating French locale to images");
    console.error(error);
    process.exit(1);
  });
