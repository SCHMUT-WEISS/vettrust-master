/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";

import Breadcrumbs from "./Breadcrumbs";
import {
  PageList,
  VTAtom,
  BlogArticleFields,
  LocationFields,
  UseVtTranslateType
} from "../../@types";
import { NextRouter } from "../../@types/next";

function VTBreadcrumbs({
  router,
  NAV_PAGES_LIST,
  useVtTranslate,
  currentBlogArticleAtom,
  currentlyDisplayedLocationAtom,
  customUseAtom,
}: VTBreadcrumbsprops) {
  const { t } = useVtTranslate();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { label: string; href: string }[]
  >([]);

  const [currentBlogArticle] = customUseAtom(currentBlogArticleAtom);
  const [currentLocation] = customUseAtom(currentlyDisplayedLocationAtom);

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = `/${pathArray.slice(0, index + 1).join("/")}`;
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1)
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  let lastBreadcrumbDisplayValue = "";

  if (router.pathname === "/blog/[blog_slug]") {
    lastBreadcrumbDisplayValue = currentBlogArticle?.name || "";
  }

  if (router.pathname.includes("/locations/[location_slug]")) {
    lastBreadcrumbDisplayValue = currentLocation?.name || "";
  }

  let breadcrumbsToDisplay =
    breadcrumbs &&
    breadcrumbs.map((breadcrumb) => (
      <a
        href={breadcrumb.href}
        key={Math.random().toString()}
        className="line-clamp-1"
      >
        {NAV_PAGES_LIST(t).find((el) => el.pathname === breadcrumb.href)
          ?.title ||
          lastBreadcrumbDisplayValue ||
          breadcrumb.label}
      </a>
    ));

  if (router.pathname.includes("/locations/[location_slug]")) {
    breadcrumbsToDisplay = [
      breadcrumbsToDisplay[breadcrumbsToDisplay.length - 1]
    ];
  }

  return <Breadcrumbs>{breadcrumbsToDisplay}</Breadcrumbs>;
}

interface VTBreadcrumbsprops {
  router: NextRouter;
  NAV_PAGES_LIST: PageList;
  currentBlogArticleAtom: ReturnType<
    VTAtom<BlogArticleFields | null>["vTAtom"]
  >;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default VTBreadcrumbs;
export * from "./Breadcrumbs";
export { default as Breadcrumbs } from "./Breadcrumbs";
