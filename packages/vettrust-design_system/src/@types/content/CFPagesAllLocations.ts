import { Asset, Entry } from "contentful";
import { CFCollectionCanton } from "./CfCollectionCanton";
import { CFCollectionLocationType } from "./CFCollectionLocationType";

export interface AllLocationsFields {
  name: string;
  heroImage: Asset;
  cantons: CFCollectionCanton[];
  locationTypes: CFCollectionLocationType[];
  platformUrl: string;
}

export type CFPagesAllLocations = Entry<AllLocationsFields>;
