import { Asset, Entry } from "contentful";
import { CFCollectionBlogArticle } from "./CFCollectionBlogArticle";
import { CfCollectionTestimonial } from "./CFCollectionTestimonial";

export interface CFPageHomeFields {
  name: string;
  heroImage: Asset;
  testimonials: CfCollectionTestimonial[];
  ourRoleSectionImage: Asset;
  heroImageSmall: Asset;
  news: CFCollectionBlogArticle[];
  platformUrl: string;
}

export type CFPageHome = Entry<CFPageHomeFields>;
