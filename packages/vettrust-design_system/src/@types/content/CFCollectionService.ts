import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { CfCollectionServiceGroup } from "./CfCollectionServiceGroup";
import { LocationTypeKeys } from "./CFCollectionLocationType";

interface ServiceFields {
  name: string;
  image: Asset;
  description: Document;
  serviceGroups: CfCollectionServiceGroup[];

  /* the following properties are for display purposes only, they don't come from contentful */
  displayAnimalTypes: string[];
  displayLocationTypeSearchKeys: LocationTypeKeys[];
}

export type CfCollectionService = Entry<ServiceFields>;
