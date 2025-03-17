import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { CfCollectionEmployee } from "./CFCollectionEmployee";

export enum ClinicaAlpinaAnimalType {
  ALL_ANIMALS = "AllAnimalTypes",
  LARGE_ANIMALS = "LargeAnimals",
}

interface DepartmentFields {
  name: string;
  email: string;
  image: Asset;
  body: Document;
  headOfDepartment: CfCollectionEmployee;
  employees: CfCollectionEmployee[];
  clinicaAlpinaAnimalType?: ClinicaAlpinaAnimalType;
  storyblokPageSlug?: string;
}

export type CFCollectionDepartment = Entry<DepartmentFields>;
