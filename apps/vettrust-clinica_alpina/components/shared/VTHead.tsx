/* eslint-disable react/require-default-props */
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { DEFAULT_VETTRUST_META_IMAGE } from "@somethingcreative-agency/vettrust-design_system";
import { NAV_PAGES_LIST } from "../../shared/constants";
import useVtTranslate from "../../shared/utils/useVtTranslate";

const VTHead: React.FC<{
  title?: string;
  description?: string;
  image?: string;
}> = ({ title, description, image }) => {
  const { t } = useVtTranslate("common");
  const router = useRouter();

  const currentRouteMap = NAV_PAGES_LIST(t).find(
    ({ pathname }) => pathname === router.pathname
  );

  const getUrl = () =>
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://vettrust.ch"}${
      router.asPath
    }`;

  return (
    <>
      <Head>
        <title>{title || currentRouteMap?.title}</title>
        <meta
          name="description"
          content={description || currentRouteMap?.description}
        />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={getUrl()} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title || currentRouteMap?.title} />
        <meta
          property="og:description"
          content={description || currentRouteMap?.description}
        />
        <meta
          property="og:image"
          content={image || DEFAULT_VETTRUST_META_IMAGE}
        />

        {/* Twitter Meta Tags */}
        <meta property="twitter:url" content={getUrl()} />
        <meta
          name="twitter:card"
          content={image || DEFAULT_VETTRUST_META_IMAGE}
        />
        <meta name="twitter:title" content={title || currentRouteMap?.title} />
        <meta
          name="twitter:description"
          content={description || currentRouteMap?.description}
        />
        <meta
          name="twitter:image"
          content={image || DEFAULT_VETTRUST_META_IMAGE}
        />
      </Head>
    </>
  );
};

export default VTHead;
