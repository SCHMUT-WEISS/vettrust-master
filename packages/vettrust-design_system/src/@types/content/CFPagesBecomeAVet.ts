import { Asset, Entry } from "contentful";
import { CfCollectionEmployee } from "./CFCollectionEmployee";
import { CfCollectionTestimonial } from "./CFCollectionTestimonial";

interface CFPageTestimonialsUsFields {
  name: string;
  heroImage: Asset;
  heroImageSmall: Asset;
  testimonials: CfCollectionTestimonial[];
  cmaoCard: CfCollectionEmployee;
  platformUrl: string;
}

export type CFPageBecomeAVet = Entry<CFPageTestimonialsUsFields>;
