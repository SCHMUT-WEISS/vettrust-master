/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-console,no-await-in-loop,no-restricted-syntax */

/**
 * This migration script adds the french locale to all employees
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
  const employees = await environment.getEntries({
    limit: 1000,
    skip: offset,
    content_type: "collection__employees",
    include: 5,
  });

  // Sending the data in batches of 5 because of the rate limit of the API
  const chunkSize = 5;
  for (let i = 0; i < employees.items.length; i += chunkSize) {
    const chunk = employees.items.slice(i, i + chunkSize);

    for (const employee of chunk) {
      const image = employee?.fields?.image?.de;
      if (image) {
        employee.fields.image.fr = image;
        try {
          await employee.update();
        } catch (e) {
          console.log("asset failed", employee.fields.name);
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
  return employees.total;
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
  .then(() => console.log("Done populating French locale to employees"))
  .catch(error => {
    console.log("Error populating French locale to employees");
    console.error(error);
    process.exit(1);
  });
