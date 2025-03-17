import React, { useEffect } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAtom } from "jotai";
import {
  DEFAULT_IMAGE_LOADER,
  Hero,
  getContentfulLocale,
  ComponentProps,
  PageProps,
  client,
  formatURL,
  VTPlatformURLS,
  Paragraph,
  Button,
  CareerVimeoContainer,
  getDeviceType,
  AccordionListSection,
  FooterHalfSurface,
  getRichTextSummary,
  StackedHalfSurface,
  Section,
  PracticeSearchSteps,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import {
  currentPracticeSearchStepAtom,
  isPracticeSearchModalDisplayedAtom,
} from "../../atoms/practiceSearch";
import { PAGES_WITH_HERO_ANIMATION } from "../../shared/constants/pages";
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import { CfPageAnnualCheck } from "../../@types/CfPageAnnualCheck";
import useVtTranslate from "../../shared/utils/useVtTranslate";
import muiTheme from "../../shared/utils/mui-theme";

// eslint-disable-next-line no-use-before-define
const AnnualCheckPage: NextPage<ComponentProps<AnnualCheckPagePageProps>> = ({
  pageMeta,
  deviceType,
}) => {
  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);
  const router = useRouter();
  const { t } = useVtTranslate("marketing");
  const [, setIsPracticeModalDisplayed] = useAtom(
    isPracticeSearchModalDisplayedAtom
  );

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
        title={t("ANNUAL_CHECK_PAGE.HERO.TITLE")}
        className=""
        scrollButtonDisplayed
        displayChildrenInSection
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        {...allAtomsAndI18n}
      >
        <Paragraph type="body_1" className="text-white">
          {t("ANNUAL_CHECK_PAGE.HERO.DESCRIPTION")}
        </Paragraph>
        <Button
          type="SECONDARY"
          size="lg"
          router={router}
          className="mt-[40px]"
          iconRight="ArrowRight"
          onClick={() => {
            setCurrentSearchStep(PracticeSearchSteps.LOCATION_NAME_FILTER);
            setIsPracticeModalDisplayed(true);
          }}
        >
          {t("ANNUAL_CHECK_PAGE.HERO.BUTTON_TEXT")}
        </Button>
      </Hero>

      <CareerVimeoContainer
        className="mt-[128px] lg:mt-[192px]"
        vimeoUrl={pageMeta.fields.vimeoUrl}
        previewVideoUrl={formatURL(
          pageMeta.fields.vimeoPreviewVideo.fields.file.url
        )}
        deviceType={deviceType}
        muiTheme={muiTheme as any}
        useVtTranslate={useVtTranslate}
        translationsPrefix="marketing:ANNUAL_CHECK_PAGE."
      />

      <AccordionListSection
        items={pageMeta?.fields?.faqs.map(faq => ({
          title: faq.fields.name,
          description: getRichTextSummary(faq.fields.description),
        }))}
        title={t("ANNUAL_CHECK_PAGE.ACCORDIONS_SECTION.TITLE")}
        showRightBgCircles
      />

      <StackedHalfSurface
        image={{
          src: formatURL(
            pageMeta?.fields?.howAnnualCheckWorksImage?.fields?.file?.url
          ),
          alt: pageMeta?.fields?.howAnnualCheckWorksImage?.fields?.description,
          blurDataUrl:
            formatURL(
              pageMeta?.fields?.howAnnualCheckWorksImage?.fields?.file?.url
            ) || DEFAULT_IMAGE_LOADER,
          className: "h-[580px]",
        }}
        className="mt-[128px] lg:mt-[192px] relative z-[10]"
      >
        <Section
          title={{
            text: t("ANNUAL_CHECK_PAGE.HOW_IT_WORKS.TITLE"),
            level: "h2",
            className: "",
          }}
          className="h-full flex flex-col justify-center z-[10]"
          childrenContainerClassname="z-[10]"
        >
          <Paragraph type="body_1">
            {t("ANNUAL_CHECK_PAGE.HOW_IT_WORKS.DESCRIPTION")}
          </Paragraph>
          <Button
            type="PRIMARY"
            size="lg"
            className="mt-[40px] relative z-[10]"
            disabled={false}
            iconRight="ArrowRight"
            url="/locations"
            iconRightClassName="w-[16px] h-[16px]"
            router={router}
          >
            {t("ANNUAL_CHECK_PAGE.HOW_IT_WORKS.BUTTON_TEXT")}
          </Button>
        </Section>
      </StackedHalfSurface>

      <FooterHalfSurface
        title={t("ANNUAL_CHECK_PAGE.WHY_DO_ANNUAL_CHECK.TITLE") as any}
        image={pageMeta.fields.whyDoAnnualCheckImage}
        reverse
      >
        <Paragraph type="body_1" className="text-darkBlue">
          {t("ANNUAL_CHECK_PAGE.WHY_DO_ANNUAL_CHECK.DESCRIPTION")}
        </Paragraph>
        <Button
          type="PRIMARY"
          size="lg"
          className="mt-[20px] lg:mt-[40px]"
          disabled={false}
          iconRight="Search"
          router={router}
          onClick={() => {
            setCurrentSearchStep(PracticeSearchSteps.LOCATION_NAME_FILTER);
            setIsPracticeModalDisplayed(true);
          }}
        >
          {t("ANNUAL_CHECK_PAGE.WHY_DO_ANNUAL_CHECK.BUTTON_TEXT")}
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
    content_type: "page__annualCheck",
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

type AnnualCheckPagePageProps = PageProps<
  {
    deviceType: string;
  },
  CfPageAnnualCheck
>;

export default AnnualCheckPage;
