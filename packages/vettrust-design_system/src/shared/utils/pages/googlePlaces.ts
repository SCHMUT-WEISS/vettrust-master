/* eslint-disable no-console */
import { PlaceData } from "@googlemaps/google-maps-services-js";
import axios from "axios";

export async function getPlaceDetails(
  placeId: string,
  locationId: string,
  locale = "de",
  domain = process.env.VETTRUST_DOMAIN
) {
  return new Promise<Partial<PlaceData>>((resolve, reject) => {
    axios
      .post(`${domain}/api/locations/places`, {
        id: locationId,
        googlePlaceId: placeId,
        locale,
      })
      .then(r => {
        resolve(r.data.data);
      })
      .catch(e => {
        console.log(e);
        reject(e);
      });
  });
}
