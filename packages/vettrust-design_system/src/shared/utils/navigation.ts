/* eslint-disable */
import { NextJsStaticPath } from "../../@types/components";

/**
 * Used to template route params and feed them back to the NextJs router when a language changes
 * @param {any} router - The nextJs router object
 * @param {String} locale - The locale that the user is navigating to
 * @param {String} slugsList - The list of slugs to pull from
 */
export const getNavigationParams = (
  router: any,
  locale: string,
  slugsList: NextJsStaticPath[]
) => {
  let query: NextJsStaticPath | undefined;
  let newQuery: { [key: string]: string } = {};

  switch (router.pathname) {
    case "/blog/[blog_slug]":
      query = slugsList.find(
        (el) => el.params["blog_slug"] === router.query["blog_slug"]
      );
      if (query) {
        query = slugsList.find(
          (el) => el.itemId === query?.itemId && el.locale === locale
        );
        if (query) {
          newQuery = { blog_slug: query.params["blog_slug"] };
        }
      }

      return newQuery;
    case "/locations/[location_slug]":
      query = slugsList.find(
        (el) => el.params["location_slug"] === router.query["location_slug"]
      );
      if (query) {
        query = slugsList.find(
          (el) => el.itemId === query?.itemId && el.locale === locale
        );
        if (query) {
          newQuery = { location_slug: query.params["location_slug"] };
        }
      }
      return newQuery;
    case "/news/[news_slug]":
      query = slugsList.find(
        (el) => el.params["news_slug"] === router.query["news_slug"]
      );
      if (query) {
        query = slugsList.find(
          (el) => el.itemId === query?.itemId && el.locale === locale
        );
        if (query) {
          newQuery = { news_slug: query.params["news_slug"] };
        }
      }
      return newQuery;

    default:
      return router.query;
  }
};
