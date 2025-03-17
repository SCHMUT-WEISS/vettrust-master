/*
 * @nkpremices
 * I think the name of this file is a bit misleading.
 * However the idea here is to have a single function that can call contentful
 * and then build up the required paths for the dynamic pages.
 * */

import { client } from "../contentful/client";
import { NextJsStaticPath } from "../../../@types/components";

export async function getDynamicPageSlugsStaticPaths(
  contentType: string,
  slugParamKey = "slug",
  extraParams: Record<string, string> = {}
) {
  const slugItems = await client.getEntries<{
    slug: Record<string, string>;
    hasExternalWebsite?: Record<string, boolean>;
  }>({
    content_type: contentType,
    locale: "*",
    select: contentType === "collection__locations" ? "fields.slug, fields.hasExternalWebsite" : "fields.slug",
    ...extraParams,
  });

  const paths: (NextJsStaticPath & {
    hasExternalLink?: boolean;
  })[] = [];

  slugItems.items.forEach(slugItem => {
    Object.keys(slugItem.fields.slug).forEach(cfLocale => {
      let hasExternalLink = false;
      if(slugItem.fields?.hasExternalWebsite) {
        // eslint-disable-next-line security/detect-object-injection
        const hasExternalLinkVal = slugItem.fields.hasExternalWebsite[cfLocale];
        if(hasExternalLinkVal)
          hasExternalLink = hasExternalLinkVal;
        else
          hasExternalLink = true;
      }
      paths.push({
        params: {
          [slugParamKey]: slugItem.fields.slug[
            cfLocale as keyof typeof slugItem.fields.slug
          ] as string,
        },
        locale: cfLocale === "en-US" ? "en" : cfLocale,
        itemId: slugItem.sys.id,
        hasExternalLink: hasExternalLink ?? false,
      });
    });
  });

  return paths;
}
