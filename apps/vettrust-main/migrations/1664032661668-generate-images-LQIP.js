/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-console,no-await-in-loop,no-restricted-syntax */

/**
 * This script generate LQIP for all the images in the space
 * One hack here is that the data is being saved as description of the image.
 * So that part should not be touched by the editors.
 */

const { createClient } = require("contentful-management");
const lqipModern = require("lqip-modern");
const axios = require("axios");

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

async function getLQIPBase64String(url) {
  const imageBuffer = (
    await axios.get(url, {
      responseType: "arraybuffer",
    })
  ).data;
  // const imageBuffer = Buffer.from(await image.arrayBuffer());
  const previewImage = await lqipModern(imageBuffer);

  return previewImage.metadata.dataURIBase64;
}

async function generateLQIP(offset = 0, format = "image/jpeg") {
  const space = await mainClient.getSpace(mainModelCredentials.space);
  const environment = await space.getEnvironment("master");
  const assets = await environment.getAssets({
    limit: 1000,
    skip: offset,
    "fields.file.de.contentType": format,
  });

  // Sending the data in batches of 5 because of the rate limit of the API
  const chunkSize = 5;
  for (let i = 0; i < assets.items.length; i += chunkSize) {
    const chunk = assets.items.slice(i, i + chunkSize);

    for (const asset of chunk) {
      const image = asset.fields.file["en-US"] || asset.fields.file.de;
      const description =
        asset.fields.description["en-US"] || asset.fields.description.de;
      if (image && (!description || !description.includes("data:image"))) {
        const base64LQIP = await getLQIPBase64String(`https:${image.url}`);
        asset.fields.description = {
          "en-US": base64LQIP,
          de: base64LQIP,
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
  const formats = ["image/jpeg", "image/png", "image/webp"];

  for (const format of formats) {
    let offset = 0;
    let total = 1000;

    while (offset < total) {
      total = await generateLQIP(offset, format);
      offset += 1000;
    }
  }
}

main()
  .then(() => console.log("Done populating LQIP"))
  .catch(error => {
    console.log("Error populating LQIP");
    console.error(error);
    process.exit(1);
  });
