/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-console */
require("dotenv/config");
const path = require("path");
const fs = require("fs");
const { createClient } = require("contentful");

const client = createClient({
  space: process.env.CONTENTFUL_MAIN_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN,
});


async function getRedirects() {
  try {
    const locationsHandle = (item) => ({
      from: item.fields.from,
      to: item.fields.to,
      permanent: item.fields.permanent,
    });

    return (
      await client.getEntries({
        content_type: "redirects",
      })
    ).items.map(item => locationsHandle(item));
  } catch (error) {
    console.log(error);
    return null;
  }
}

const run = async () => {
  console.log("Fetching redirects...");

  const redirects = await getRedirects();

  if (redirects === null) {
    console.log("No redirects found...");
    return;
  }

  fs.writeFileSync(
    path.join(__dirname, "../shared/constants/redirects.json"),
    JSON.stringify(redirects, null, 2)
  );
};

run().then(() => {
  console.log("Done...");
});
