import { Asset, Entry } from "contentful";

interface PartnerFields {
  name: string;
  website: string;
  logo: Asset;
}

export type CfCollectionPartner = Entry<PartnerFields>;

interface PartnerTypeFields {
  name: string;
  partners: CfCollectionPartner[];
  sortingIndex: number;
}

export type CfCollectionPartnerType = Entry<PartnerTypeFields>;

interface RegionalPartnerTypeFields {
  name: string;
  partners: CfCollectionPartner[];
  sortingIndex: number;
}

export type CfCollectionRegionalPartnerType = Entry<RegionalPartnerTypeFields>;
