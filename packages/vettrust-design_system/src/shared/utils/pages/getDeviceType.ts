import MobileDetect from "mobile-detect";
import { IncomingMessage } from "http";
import { CFCollectionBlogArticle } from "../../../@types";

export function getDeviceType(
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }
) {
  let userAgent;
  let deviceType;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const md = new MobileDetect(userAgent as string);
  if (md.tablet()) {
    deviceType = "tablet";
  } else if (md.mobile()) {
    deviceType = "mobile";
  } else {
    deviceType = "desktop";
  }

  return deviceType;
}

export const platformArticleFilter = (envUrls: string) => (article: CFCollectionBlogArticle) =>
  envUrls.split(",").some((url) => article.fields.pageUrl.includes(url));
