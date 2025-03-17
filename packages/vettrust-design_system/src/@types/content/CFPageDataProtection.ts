import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

interface CFPageDataProtectionFields {
  name: string;
  heroImage: Asset;
  heroImageSmall: Asset;
  heroTitle: string;
  body: Document;
  platformUrl: string;
}

export type CFPageDataProtection = Entry<CFPageDataProtectionFields>;
