import { Asset, Entry } from "contentful";

interface BlogArticleAuthorFields {
  name: string;
  image: Asset;
}

export type CfCollectionBlogArticleAuthor = Entry<BlogArticleAuthorFields>;
