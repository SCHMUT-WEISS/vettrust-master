import { Asset, Entry } from "contentful";
import { CFCollectionFAQs } from "./CFCollectionFAQs";

export interface PageLocationFields {
  name: string;
  ourStandardServicesSectionImage: Asset;
  petAmbulanceImage: Asset;
  standardServicesSectionImage: Asset;
  defaultServiceImage: Asset;
  emergencyPhoneNumber: string;
  emergencyImage: Asset;
  solutionForAnimalsSectionImage: Asset;
  cooperationOfTheAntonFoundationSection: Asset;
  animalRescueBaselAreaImage: Asset;
  rescueFaq: CFCollectionFAQs[];
  clinikPlusFaQs: CFCollectionFAQs[];
  petRescueSolutionForAnnimalsLink: string;
  petRescueCooperationOfTheAntonFoundationLink: string;
  platformUrl: string;
}

export type CFPageLocationCommonMetadata = Entry<PageLocationFields>;
