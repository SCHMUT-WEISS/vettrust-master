import { Entry } from "contentful";
import { CfCollectionService } from "./CFCollectionService";

export enum AnimalTypes {
  KLEINTIERMEDIZIN = "Kleintiermedizin",
  PFERDEMEDIZIN = "Pferdemedizin",
  NUTZTIERMEDIZIN = "Nutztiermedizin",
}

interface ServiceAnimalRelationsFields {
  name: string;
  relatedService: CfCollectionService;
  animalType: AnimalTypes;
}

export type CfCollectionServiceAnimalRelations =
  Entry<ServiceAnimalRelationsFields>;
