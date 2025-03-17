import { Merge } from "../index";

/* Generalization of the props of a Page Component */
export type PageProps<T, M = Record<string, unknown>> = Merge<
  {
    locale: string;
    pageMeta: M;
  },
  T
>;
