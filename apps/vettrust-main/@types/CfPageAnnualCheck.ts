import { Asset, Entry } from "contentful";
import { CFCollectionFAQs } from "@somethingcreative-agency/vettrust-design_system";

export interface CFPageAnnualCheckFields {
  platformUrl: string;
  name: string;
  heroImage: Asset;
  heroImageSmall: Asset;
  vimeoUrl: string;
  vimeoPreviewVideo: Asset;
  howAnnualCheckWorksImage: Asset;
  whyDoAnnualCheckImage: Asset;
  faqs: CFCollectionFAQs[];
}

export type CfPageAnnualCheck = Entry<CFPageAnnualCheckFields>;
