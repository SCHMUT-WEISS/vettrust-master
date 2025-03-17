import { Asset, Entry } from "contentful";
import { CfCollectionEmployee } from "./CFCollectionEmployee";
import { CFCollectionBlogArticle } from "./CFCollectionBlogArticle";

interface CFPageAboutUsFields {
  name: string;
  infoSectionImage: Asset;
  heroImage: Asset;
  heroImageSmall: Asset;
  ceoCard: CfCollectionEmployee;
  managementEmployees: CfCollectionEmployee[];
  businessManagement: CfCollectionEmployee[];
  news: CFCollectionBlogArticle[];
  vimeoUrl?: string;
  careerImage?: Asset;
  platformUrl: string;
}

export type CFPageAboutUs = Entry<CFPageAboutUsFields>;
