import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

interface ServiceGroupFields {
  name: string;
  isStandardServiceGroup: boolean;
  isTelemedicine?: boolean;
  image: Asset;
  description: Document;
  sortingIndex: number;
}

export type CfCollectionServiceGroup = Entry<ServiceGroupFields>;
