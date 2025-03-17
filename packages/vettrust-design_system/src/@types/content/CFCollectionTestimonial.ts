import { Asset, Entry } from "contentful";

interface CFTestimonialsFields {
  name: string;
  authorName: string;
  authorImage: Asset;
  authorRole: string;
  testimony: string;
}

export type CfCollectionTestimonial = Entry<CFTestimonialsFields>;
