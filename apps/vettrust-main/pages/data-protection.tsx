import React, { useEffect } from "react";
import { GetStaticPropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BLOCKS } from "@contentful/rich-text-types";
import { useAtom } from "jotai";
import {
  formatURL,
  client,
  PageProps,
  CFPageDataProtection,
  ComponentProps,
  RichTextRenderer,
  Hero,
  getContentfulLocale,
  DEFAULT_IMAGE_LOADER,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import { currentPracticeSearchStepAtom } from "../atoms/practiceSearch";
import { PAGES_WITH_HERO_ANIMATION } from "../shared/constants/pages";
import { allAtomsAndI18n } from "../shared/utils/designSystem";

import useVtTranslate from "../shared/utils/useVtTranslate";

// eslint-disable-next-line no-use-before-define
const DataProtectionPage: NextPage<ComponentProps<DataProtectionPageProps>> = ({
  pageMeta,
}) => {
  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);
  const router = useRouter();

  useEffect(
    () => {
      return () => setCurrentSearchStep(null);
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  return (
    <>
      <Hero
        bgImage={{
          url: formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url),
          smallUrl: formatURL(
            pageMeta?.fields?.heroImageSmall?.fields?.file?.url
          ),
          blurDataUrl:
            formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
          alt: pageMeta?.fields?.heroImage?.fields?.description,
        }}
        title={pageMeta.fields.heroTitle}
        className=""
        scrollButtonDisplayed={false}
        displayChildrenInSection
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        {...allAtomsAndI18n}
      />
      <div className="container-wrapper px-[20px] md:px-[96px] lg:px-[197px] mb-[92px] mt-[64px] lg:mt-[96px]">
        <RichTextRenderer
          useVtTranslate={useVtTranslate}
          document={pageMeta.fields.body}
          classes={{
            renderNode: {
              [BLOCKS.PARAGRAPH]: "mt-[0px]",
              [BLOCKS.HEADING_3]: "mt-[24px]",
            },
          }}
        />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "pages__dataProtection",
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.VETTRUST,
  });

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale as string, [
        "blog",
        "common",
        "about",
        "become-vet",
        "location",
      ])),
      pageMeta: pageMeta.items[0],
    },
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
type DataProtectionPageProps = PageProps<{}, CFPageDataProtection>;

export default DataProtectionPage;
