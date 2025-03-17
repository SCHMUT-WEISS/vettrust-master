/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";
import {
  Client,
  Language,
  PlaceData,
} from "@googlemaps/google-maps-services-js";
import placesDataSetDE from "../../../public/appGooglePlacesData/de.json";
import placesDataSetEN from "../../../public/appGooglePlacesData/en.json";
import placesDataSetFR from "../../../public/appGooglePlacesData/fr.json";


const HR_IN_MS = 1000 * 60 * 60;

const HRS_OF_STORE =
  typeof process.env.HRS_OF_STORE === "string"
    ? parseInt(process.env.HRS_OF_STORE, 10)
    : 24; // 24 hours

const REVALIDATE_TIME = HR_IN_MS * HRS_OF_STORE;

// const sendMessageToSlack = (message: string) => {
//   fetch(process.env.SLACK_WEBHOOK_URL as string, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       text: message,
//     }),
//   });
// };

async function getGooglePlaceDetailsFromAPI(placeId: string, locale = "de") {
  const client = new Client({});
  let language: Language;

  switch (locale) {
    case "de":
      language = Language.de;
    case "en":
      language = Language.en;
    case "fr":
      language = Language.fr;

    default:
      language = Language.de;
  }

  return new Promise<Partial<PlaceData>>((resolve, reject) => {
    client
      .placeDetails({
        params: {
          language,
          key: process.env.GOOGLE_MAPS_GEOCODING_API_KEY as string,
          place_id: placeId,
          // ⚠️CAUTION ⚠️
          //  If you don't specify fields, you'll be charged for all available $$$
          fields: ["formatted_address", "opening_hours", "geometry"],
        },
        headers: {
          Referer: process.env.VETTRUST_DOMAIN || "",
        },
        timeout: 1000, // milliseconds
      })
      .then((r) => {
        resolve(r.data.result);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}

const getGooglePlaceData = async (googlePlaceId: string, locale: string) => {
  if (!googlePlaceId) return null;

  return await getGooglePlaceDetailsFromAPI(googlePlaceId, locale);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${REVALIDATE_TIME}, stale-while-revalidate=59`
  );
  const { id, googlePlaceId } = req.body;
  const { locale } = req.body;

  const currentLocale = locale || "de";

  try {

    if (!id || !googlePlaceId) {
      return res.status(400).json({
        error: "id: string and googlePlaceId: string are required",
      });
    }

    const googleData = await getGooglePlaceData(googlePlaceId, currentLocale);

    return res.status(200).json({
      error: "",
      message: "Google Place Data",
      data: googleData,
    });
  } catch (error) {
    console.error(error);
    let cacheGoogleData: PlaceData, cacheFile: any;

    if (currentLocale === "fr") cacheFile = placesDataSetFR.data;
    else if (currentLocale === "en") cacheFile = placesDataSetEN.data;
    else cacheFile = placesDataSetDE.data;

    cacheGoogleData = cacheFile.find(
      (d: { location: { id: string } }) => d.location.id === id
    ) as PlaceData;

    return res.status(200).json({
      error: "",
      message: "Old Google Place Data",
      data: cacheGoogleData,
    });
  }
};
