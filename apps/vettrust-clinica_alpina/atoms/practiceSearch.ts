import { atom } from "jotai";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import {
  CFCollectionLocation,
  CfCollectionService,
  LocationSearchIndex,
  VtMapPlacesResult,
} from "@somethingcreative-agency/vettrust-design_system";

/* Just the 2 steps of the location/practice search drawer */
export enum PracticeSearchSteps {
  LOCATION_NAME_FILTER = "LOCATION_NAME_FILTER",
  SERVICE_AND_ANIMAL_TYPE_FILTER = "SERVICE_AND_ANIMAL_TYPE_FILTER",
}

/* Search can be done either full text in the input or by canton selection */
export enum PracticeSearchTypes {
  FULL_TEXT = "FULL_TEXT",
  CANTON = "CANTON",
}

/* Overall filters to be used to filter the results in the end by services */
export type PracticeSearchFilter = {
  hasStandardServices: boolean;
  services: CfCollectionService[];
  locationTypeSearchKey: string;
  animalType: string;
};

export interface LocationsPlacedData {
  placesData: Partial<PlaceData>;
  location: { id: string; googlePlaceId: string };
}

/* Atom to hold just the 2 steps of the location/practice search drawer */
export const currentPracticeSearchStepAtom = atom<PracticeSearchSteps | null>(
  null
);

/* Atom to hold the state that tells that search can be done either full text in the input or by canton selection */
export const currentPracticeSearchTypeAtom = atom<PracticeSearchTypes | null>(
  null
);

/* A single entry for all locations */
export const allLocationsAtom = atom<CFCollectionLocation[]>([]);

export const allLocationsGPlacesDataAtom = atom<LocationsPlacedData[]>([]);

/* Loading state of the endpoint /api/locations used on every page */
export const allLocationsLoadingAtom = atom(false);

/* A single entry for search results, usually only updated in the first part of the search */
export const practiceSearchResultsAtom = atom<CFCollectionLocation[]>([]);

/* This is just to provide a different state for the full text search to avoid unwanted reloads */
export const currentGlobalPracticeSearchFiltersAtom = atom<{
  fullTextSearch: string;
  filters: string[];
}>({
  fullTextSearch: "",
  filters: [],
});

/* An atom to hold the Overall filters to be used to filter the results in the end by services */
export const currentServicesFilterAtom = atom<PracticeSearchFilter>({
  hasStandardServices: false,
  services: [],
  locationTypeSearchKey: "",
  animalType: "",
});

/*  State to open and close the search drawer */
export const isPracticeSearchModalDisplayedAtom = atom(false);

/* These are indexes to be used to easily do some quick frontend filtering */
export const globalLocationSearchIndexesAtom = atom<LocationSearchIndex[]>([]);

/* This is used when no selection is made */
export const shouldReloadFiltersAtom = atom(true);

/* To be used as a setter of cantonId="All Cantons" when nothing was selected in step one of the search */
export const initialCantonIdAtom = atom("");

/* State to hold the `isLoading` property of the whole search */
export const isSearchLoadingAtom = atom(false);

/* Services displayed on step two of the search */
export const servicesDisplayedOnStepTwoAtom = atom<CfCollectionService[]>([]);

export const selectedPlaceResultAtom = atom<VtMapPlacesResult | null>(null);
