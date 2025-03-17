import { Asset, Entry } from "contentful";
import { CfCollectionEmployee } from "./CFCollectionEmployee";

interface CFPageCareerFields {
  name: string;
  heroImage: Asset;
  heroImageSmall: Asset;
  vimeoUrl: string;
  vimeoPreviewVideo: Asset;
  personalDevelopmentImage: Asset;
  careerWithVetTrustImage: Asset;
  ourJobOffersImage: Asset;
  signupImage: Asset;
  signupSenderEmail: string;
  signupReceiverEmail: Asset;
  platformUrl: string;
  contactImage: Asset;
  calendlyLink: string;
  contactName: string;
  contactJobTitle: string;
  contactEmailAddress: string;
  contactCard: CfCollectionEmployee;
  bubbleText: string,
  bubbleDegree: string,
  academyTitle: string,
  academyDescription: string,
  academyButtonText: string,
  academyButtonUrl: string,
  link: string,
  linkText: string,
}

export type CFPageCareer = Entry<CFPageCareerFields>;
