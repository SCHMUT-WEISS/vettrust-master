import { PlaceData } from "@googlemaps/google-maps-services-js";
import { CfCollectionService } from "./content";

export interface LocationsPlacedData {
  placesData: Partial<PlaceData>;
  location: { id: string; googlePlaceId: string };
}

export enum PracticeSearchSteps {
  LOCATION_NAME_FILTER = "LOCATION_NAME_FILTER",
  SERVICE_AND_ANIMAL_TYPE_FILTER = "SERVICE_AND_ANIMAL_TYPE_FILTER"
}

/* Search can be done either full text in the input or by canton selection */
export enum PracticeSearchTypes {
  FULL_TEXT = "FULL_TEXT",
  CANTON = "CANTON"
}

/* Overall filters to be used to filter the results in the end by services */
export type PracticeSearchFilter = {
  hasStandardServices: boolean;
  services: CfCollectionService[];
  locationTypeSearchKey: string;
  animalType: string;
};
