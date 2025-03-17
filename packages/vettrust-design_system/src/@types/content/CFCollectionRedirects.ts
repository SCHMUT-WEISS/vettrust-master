import { Entry } from "contentful";

export interface CFRedirectsFields {
  from: string;
  to: string;
  permanent: boolean;
}

export type CfCollectionRedirects = Entry<CFRedirectsFields>;
