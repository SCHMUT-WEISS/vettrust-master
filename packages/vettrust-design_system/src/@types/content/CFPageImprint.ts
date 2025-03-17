import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

interface CFPageImprintFields {
  name: string;
  heroImage: Asset;
  heroImageSmall: Asset;
  heroTitle: string;
  body: Document;
  platformUrl: string;
}

export type CFPageImprint = Entry<CFPageImprintFields>;
