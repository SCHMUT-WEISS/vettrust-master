import { Entry } from "contentful";
import { CFCollectionFAQs } from "./CFCollectionFAQs";

export enum LocationTypeKeys {
  CLINIC = "Klinik",
  CLINIC_PLUS = "Kilinik_plus",
  COIFFEUR = "Coiffeur",
  PET_HOTEL = "Tierhotel",
  PRACTICE = "Praxis",
}

export interface LocationTypeFields {
  name: string;
  searchKey: LocationTypeKeys;
  displayedFaQs: CFCollectionFAQs[];
}

export type CFCollectionLocationType = Entry<LocationTypeFields>;
