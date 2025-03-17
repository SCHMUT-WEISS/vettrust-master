import {
  CfCollectionRedirects,
  CFRedirectsFields,
} from "@somethingcreative-agency/vettrust-design_system";
import { NextRequest, NextResponse } from "next/server";
import staticRedirect from "./shared/constants/redirects.json";

const PUBLIC_FILE = /\.(.*)$/;

const CONTENTFUL_URL = `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_MAIN_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}/entries?access_token=${process.env.CONTENTFUL_MAIN_DELIVERY_ACCESS_TOKEN}&content_type=redirects`;

async function getRedirects(): Promise<CFRedirectsFields[] | null> {
  let redirects: CFRedirectsFields[] = [];
  try {
    const response = await fetch(CONTENTFUL_URL);
    const redirectsResponse = await response.json();

    redirects = redirectsResponse.items.map(
      (link: CfCollectionRedirects) => link.fields
    ) as CFRedirectsFields[];

    return redirects;
  } catch (error) {
    console.error("Error fetching redirects:", error);

    return null;
  }
}

function normalizeUrl(url: string, baseHost: string) {
  try {
    const normalized = new URL(url);

    if (process.env.APP_ENV === "dev") {
      normalized.host = baseHost;
      normalized.protocol = "http";
    }

    normalized.pathname = normalized.pathname.replace(/\/+$/, "");
    normalized.searchParams.sort();
    return normalized.toString();
  } catch (e) {
    console.error("Invalid URL:", e);
    return null;
  }
}

function compareUrls(origin: string, url: string) {
  const base = new URL(origin);

  const normalizedUrl1 = normalizeUrl(origin, base.host);
  const normalizedUrl2 = normalizeUrl(url, base.host);

  return normalizedUrl1 === normalizedUrl2;
}

function isEmptyValue(value: unknown) {
  return (
    value === undefined ||
    value === null ||
    Number.isNaN(value) ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}

export default async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { nextUrl } = request;
  let redirects: CFRedirectsFields[] | null = [];

  // Early return if it is a public file such as an image
  if (
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(nextUrl.pathname)
  )
    return res;

  try {
    redirects = await getRedirects();
  } catch (e) {
    console.error(e);
  }

  if (!redirects) {
    redirects = staticRedirect as CFRedirectsFields[];
  }

  const contentfulRedirect = redirects.find(link =>
    compareUrls(request.url, link.from)
  );

  if (contentfulRedirect) {
    if (isEmptyValue(contentfulRedirect.to)) {
      return NextResponse.rewrite(`${nextUrl.origin}/404`, {
        status: 404,
      });
    }

    return NextResponse.redirect(contentfulRedirect.to, {
      status: contentfulRedirect.permanent ? 301 : 302,
    });
  }

  return res;
}
