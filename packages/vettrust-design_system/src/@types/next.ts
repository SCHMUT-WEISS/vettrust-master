import { ParsedUrlQuery } from "querystring";

interface DomainLocale {
  defaultLocale: string;
  domain: string;
  http?: true;
  locales?: string[];
}

type BaseRouter = {
  route: string;
  pathname: string;
  query: ParsedUrlQuery;
  asPath: string;
  basePath: string;
  locale?: string | undefined;
  locales?: string[] | undefined;
  defaultLocale?: string | undefined;
  domainLocales?: DomainLocale[] | undefined;
  isLocaleDomain: boolean;
};

type Router = any;

export type NextRouter = BaseRouter &
  Pick<
    Router,
    | "push"
    | "replace"
    | "reload"
    | "back"
    | "prefetch"
    | "beforePopState"
    | "events"
    | "isFallback"
    | "isReady"
    | "isPreview"
  >;
