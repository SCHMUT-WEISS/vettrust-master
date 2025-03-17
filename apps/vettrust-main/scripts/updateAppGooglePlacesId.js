/* eslint-disable @typescript-eslint/no-var-requires,import/no-extraneous-dependencies,no-console */
require("dotenv/config");
const { createClient } = require("contentful");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const de = require("../public/appGooglePlacesData/de.json");
const en = require("../public/appGooglePlacesData/en.json");
const fr = require("../public/appGooglePlacesData/fr.json");

const client = createClient({
  space: process.env.CONTENTFUL_MAIN_SPACE_ID,
  accessToken: process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN,
});

const run = async () => {
  console.log("Fetching entries...");

  const locationsEn = await client.getEntries({
    content_type: "collection__locations",
    include: 3,
    locale: "en-US",
  });

  const locationsDE = await client.getEntries({
    content_type: "collection__locations",
    include: 3,
    locale: "de",
  });

  console.log("Done.");

  console.log("Fetching google places data...");

  const HR_IN_MS = 1000 * 60 * 60;
  const DAY_IN_MS = HR_IN_MS * 24;

  const DAY_OF_STORE = 3;

  const REVALIDATE_TIME = DAY_IN_MS * DAY_OF_STORE;

  const now = Date.now();

  try {
    if (!en?.date || now - en.date > REVALIDATE_TIME) {
      const resEN = await axios.post(
        `${process.env.VETTRUST_DOMAIN}/api/google/places`,
        {
          locations: locationsEn.items
            .filter(el => el.fields.googlePlaceId)
            .map(location => ({
              id: location.sys.id,
              googlePlaceId: location.fields.googlePlaceId,
            })),
          locale: "en",
        }
      );

      if(resEN.status >= 200 && resEN.status < 300) {
        fs.writeFileSync(
          path.join(__dirname, "../public/appGooglePlacesData/en.json"),
          JSON.stringify(
            {
              date: now,
              data: resEN.data,
              message: resEN?.message ?? "Success",
              error: resEN?.error ?? "",
            },
            null,
            2
          )
        );
      }
    }

    if (!de?.date || now - de.date > REVALIDATE_TIME) {
      const resDE = await axios.post(
        `${process.env.VETTRUST_DOMAIN}/api/google/places`,
        {
          locations: locationsDE.items
            .filter(el => el.fields.googlePlaceId)
            .map(location => ({
              id: location.sys.id,
              googlePlaceId: location.fields.googlePlaceId,
            })),
          locale: "de",
        }
      );
      
      if(resDE.status >= 200 && resDE.status < 300) {
        fs.writeFileSync(
          path.join(__dirname, "../public/appGooglePlacesData/de.json"),
          JSON.stringify(
            {
              date: now,
              data: resDE.data,
              message: resDE?.message ?? "Success",
              error: resDE?.error ?? "",
            },
            null,
            2
          )
        );
      }
    }

    if (!fr?.date || now - fr.date > REVALIDATE_TIME) {
      const resFR = await axios.post(
        `${process.env.VETTRUST_DOMAIN}/api/google/places`,
        {
          locations: locationsDE.items
            .filter(el => el.fields.googlePlaceId)
            .map(location => ({
              id: location.sys.id,
              googlePlaceId: location.fields.googlePlaceId,
            })),
          locale: "fr",
        }
      );

      if(resFR.status >= 200 && resFR.status < 300) {
        fs.writeFileSync(
          path.join(__dirname, "../public/appGooglePlacesData/fr.json"),
          JSON.stringify(
            {
              date: now,
              data: resFR.data,
              message: resFR?.message ?? "Success",
              error: resFR?.error ?? "",
            },
            null,
            2
          )
        );
      }
    }

    console.log("Done.");
  } catch (error) {
    console.log(error);
  }
};

run().then(() => {
  console.log("Done...");
});
