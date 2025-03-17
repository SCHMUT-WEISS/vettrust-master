/* eslint-disable sonarjs/no-identical-functions */
import React, { useEffect } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAtom } from "jotai";
import {
  Button,
  client,
  ComponentProps,
  DEFAULT_IMAGE_LOADER,
  FooterHalfSurface,
  formatURL,
  getContentfulLocale,
  getDeviceType,
  Hero,
  PageProps,
  Paragraph,
  Section,
  StackedHalfSurface,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import { currentPracticeSearchStepAtom } from "../../atoms/practiceSearch";
import { PAGES_WITH_HERO_ANIMATION } from "../../shared/constants/pages";
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import useVtTranslate from "../../shared/utils/useVtTranslate";
import { CfPageEmergency } from "../../@types/CfPageEmergency";

// eslint-disable-next-line no-use-before-define
const Emergency: NextPage<ComponentProps<EmergencyPageProps>> = ({
  pageMeta,
}) => {
  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);
  const router = useRouter();
  const { t } = useVtTranslate("marketing");

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
            formatURL(pageMeta.fields.heroImage?.fields.file.url) ||
            DEFAULT_IMAGE_LOADER,
          alt: pageMeta?.fields?.heroImage?.fields?.description,
        }}
        title={t("EMERGENCY_PAGE.HERO.TITLE")}
        className=""
        scrollButtonDisplayed
        displayChildrenInSection
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        {...allAtomsAndI18n}
      >
        <Paragraph type="body_1" className="text-white">
          {t("EMERGENCY_PAGE.HERO.DESCRIPTION")}
        </Paragraph>
        <Button
          type="MAGENTA"
          size="lg"
          router={router}
          className="mt-[40px]"
          iconLeft="PhonePlus"
          url={`tel:${t("EMERGENCY_PAGE.HERO.BUTTON_TEXT")}`}
        >
          {t("EMERGENCY_PAGE.HERO.BUTTON_TEXT")}
        </Button>
      </Hero>

      <StackedHalfSurface
        image={{
          src: formatURL(pageMeta?.fields?.howItWorksImage?.fields?.file?.url),
          alt: pageMeta?.fields?.howItWorksImage?.fields?.description,
          blurDataUrl:
            formatURL(pageMeta?.fields?.howItWorksImage?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
          className: "h-[580px]",
        }}
        className="mt-[128px] lg:mt-[192px] relative z-[10]"
      >
        <Section
          title={{
            text: t("EMERGENCY_PAGE.HOW_IT_WORKS.TITLE"),
            level: "h2",
            className: "",
          }}
          className="h-full flex flex-col justify-center z-[10]"
          childrenContainerClassname="z-[10]"
        >
          <Paragraph type="body_1">
            {t("EMERGENCY_PAGE.HOW_IT_WORKS.DESCRIPTION")}
          </Paragraph>
          <Button
            type="MAGENTA"
            size="lg"
            className="mt-[40px] relative z-[10]"
            disabled={false}
            iconLeft="PhonePlus"
            iconRightClassName="w-[16px] h-[16px]"
            router={router}
            url={`tel:${t("EMERGENCY_PAGE.HOW_IT_WORKS.BUTTON_TEXT")}`}
          >
            {t("EMERGENCY_PAGE.HOW_IT_WORKS.BUTTON_TEXT")}
          </Button>
        </Section>
      </StackedHalfSurface>

      <FooterHalfSurface
        title={t("EMERGENCY_PAGE.FOOTER_SECTION.TITLE") as any}
        image={pageMeta.fields.footerImage}
        reverse
      >
        <Paragraph type="body_1" className="text-darkBlue">
          {t("EMERGENCY_PAGE.FOOTER_SECTION.DESCRIPTION")}
        </Paragraph>
        <Button
          type="MAGENTA"
          size="lg"
          className="mt-[20px] lg:mt-[40px]"
          disabled={false}
          iconLeft="PhonePlus"
          router={router}
          url={`tel:${t("EMERGENCY_PAGE.FOOTER_SECTION.BUTTON_TEXT")}`}
        >
          {t("EMERGENCY_PAGE.FOOTER_SECTION.BUTTON_TEXT")}
        </Button>
      </FooterHalfSurface>
    </>
  );
};

export async function getServerSideProps({
  req,
  locale,
}: GetServerSidePropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "page__emergency",
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.VETTRUST,
  });

  return {
    props: {
      locale,
      deviceType: getDeviceType(req),
      ...(await serverSideTranslations(locale as string, [
        "blog",
        "common",
        "about",
        "become-vet",
        "location",
        "marketing",
      ])),
      pageMeta: pageMeta.items[0],
    },
  };
}

type EmergencyPageProps = PageProps<
  {
    deviceType: string;
  },
  CfPageEmergency
>;

export default Emergency;
