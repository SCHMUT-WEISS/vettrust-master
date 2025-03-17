import { Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface FAQFields {
  name: string;
  description: Document;
}

export type CFCollectionFAQs = Entry<FAQFields>;
