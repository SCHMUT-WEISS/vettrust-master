import React from "react";
import * as Icons from "../../assets/icons";
import {
  CFCollectionLocation,
  AnimalTypes,
  CFCollectionLocationType,
  CfCollectionService
} from "../content";

/* A bullet Card is an item of the grid section found for example on the section titled `Was macht VetTrust aus?` under the about us page */
export interface BulletCard {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description: string | React.ReactNode;
  icon?: keyof typeof Icons;
}

/* Just a map of how we would have our static path with an id from contentful
 *  PS: The id helps with switching slugs between languages
 *  */
export interface NextJsStaticPath {
  params: { [key: string]: string };
  locale: string;
  itemId: string;
}

/* This object is built for all projects narrowed down to those that are close to the selected location in the search */
export interface LocationSearchIndex {
  location: CFCollectionLocation;
  animalTypes: AnimalTypes[];
  locationType: CFCollectionLocationType;
  hasStandardServices: boolean;
  services: CfCollectionService[];
}

export * from "./buttons";
export * from "./inputs";
export * from "./maps";
export * from "./modals";
export * from "./page";
