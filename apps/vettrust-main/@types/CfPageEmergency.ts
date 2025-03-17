import { Asset, Entry } from "contentful";

export interface CFPageEmergencyFields {
  platformUrl: string;
  name: string;
  heroImage: Asset;
  heroImageSmall: Asset;
  howItWorksImage: Asset;
  footerImage: Asset;
}

export type CfPageEmergency = Entry<CFPageEmergencyFields>;
