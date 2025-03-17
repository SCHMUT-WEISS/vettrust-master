import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_MAIN_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN as string,
});

export const getLocale = (locale: string) => {
  if (locale && locale === "en") {
    return "en-US";
  }

  if (locale && locale === "fr") {
    return "fr";
  }

  return "de";
};