import { Asset, Entry } from "contentful";
import { CFCollectionBlogArticle } from "./CFCollectionBlogArticle";

/**
 * This interface holds the keys of both `Collection__NewsArticles` and `Collection__BlogArticle`
 * That's why we have both heroNews and heroBlogArticles.
 * Watch out for that in the code
 */
interface CFPageNewsFields {
  name: string;
  heroImage: Asset;
  heroImageSmall: Asset;
  heroNews: CFCollectionBlogArticle[];
  heroBlogArticles: CFCollectionBlogArticle[];
  allArticles: CFCollectionBlogArticle[];
  pageUrl: string;
}

export type CFPageNews = Entry<CFPageNewsFields>;
