import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";
import { CfCollectionBlogArticleAuthor } from "./CfCollectionBlogArticleAuthor";

export interface BlogArticleFields {
  name: string;
  thumbnail: Asset;
  slug: string;
  summary: string;
  body: Document;
  publishedAt: string;
  author: CfCollectionBlogArticleAuthor;
  pageUrl: string;
  // locationTypes: CF[];
}

export type CFCollectionBlogArticle = Entry<BlogArticleFields>;
