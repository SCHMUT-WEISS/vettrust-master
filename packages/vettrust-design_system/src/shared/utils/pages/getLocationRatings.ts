/* eslint-disable no-return-await */
import axios from "axios";
import { CFCollectionLocation } from "../../../@types/content/CFClollectionLocation";
import { VTRating } from "../../../@types/content/VTRating";

export async function getLocationRatings(
  location: CFCollectionLocation,
  numberOfRatings = 10
) {
  let ratings: VTRating[] = [];

  try {
    ratings = await Promise.all(
      new Array(numberOfRatings).fill(null).map(async (_, index) => {
        const { data } = await axios.get<VTRating>(
          `https://service.virtualrecall.com/OrganisationAdmin/${
            location.fields.testimonialsId || "gDcvq"
          }/Survey/TestimonialFeed?retrieveFromLastX=${index + 1}`
        );

        return data;
      })
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return ratings;
  }

  return ratings;
}
