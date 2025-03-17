import { Entry } from "contentful";

interface CantonFields {
  name: string;
  sortingIndex: number;
}

export type CFCollectionCanton = Entry<CantonFields>;
