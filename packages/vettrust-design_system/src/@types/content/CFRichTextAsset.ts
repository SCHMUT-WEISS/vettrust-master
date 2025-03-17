import { Asset } from "contentful";

export interface CFRichTextEmbedAsset {
  data: { target: Asset };
  content: Array<unknown>;
  nodeType: string;
}
