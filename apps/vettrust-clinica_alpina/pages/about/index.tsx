/* eslint-disable security/detect-object-injection */
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useAtom } from "jotai";
import {
  ComponentProps,
  CFPageAboutUs,
  formatURL,
  BulletCardsGrid,
  BulletCard,
  Section,
  Button,
  UserCard,
  NewsCarousel,
  PageProps,
  BottomFooterContainer,
  getDeviceType,
  Hero,
  CeoClippedCard,
  getContentfulLocale,
  Paragraph,
  DEFAULT_IMAGE_LOADER,
  compareArticlesByDate,
  BgCircleCanvas as BgCircleCanvasRight,
  IconsT as Icons,
  VTPlatformURLS,
  StackedRightSurface,
  client,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import { currentPracticeSearchStepAtom } from "../../atoms/practiceSearch";
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import { PAGES_WITH_HERO_ANIMATION } from "../../shared/constants/pages";
import useVtTranslate from "../../shared/utils/useVtTranslate";

// eslint-disable-next-line
const About: NextPage<ComponentProps<AboutPageProps>> = ({
  pageMeta,
  deviceType,
}) => {
  const { t } = useTranslation("about");
  const router = useRouter();

  const bulletsIcons: Array<keyof Icons> = [
    "HeartWaveDanger",
    "CandleDanger",
    "MedicineDanger",
    "GemDanger",
  ];

  const bulletCards = new Array(4).fill(null).map(
    (_, index) =>
      ({
        title: t("BULLET_CARDS_GRID.BULLETS.TITLE", { context: index + 1 }),
        description: t("BULLET_CARDS_GRID.BULLETS.DESCRIPTION", {
          context: index + 1,
        }),
        icon: bulletsIcons[index],
      } as BulletCard)
  );

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

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
        title={t("HERO.TITLE")}
        className="text-white"
        scrollButtonDisplayed
        displayChildrenInSection
        router={router}
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        {...allAtomsAndI18n}
      >
        <div className="text-[18px]">{t("HERO.DESCRIPTION")}</div>
      </Hero>

      <div className="relative z-[10] " id="bullets-card-grid">
        <BulletCardsGrid
          title={t("BULLET_CARDS_GRID.TITLE")}
          bulletCards={bulletCards}
          className="mt-[212px] md:mt-[192px]"
        />

        <BgCircleCanvasRight className="absolute about-bg-circles top-[calc(50%_-_400px)] z-[-1]" />

        <CeoClippedCard
          className="mt-[64px] md:mt-[96px] hidden lg:block"
          ceoData={pageMeta.fields.ceoCard}
          type="DESKTOP"
        />

        <CeoClippedCard
          className="mt-[64px] md:mt-[96px] lg:hidden"
          ceoData={pageMeta.fields.ceoCard}
          type="MOBILE"
        />
      </div>

      <StackedRightSurface
        image={{
          src: formatURL(
            pageMeta?.fields?.careerImage?.fields?.file?.url as string
          ),
          alt: pageMeta?.fields?.careerImage?.fields?.description as string,
          blurDataUrl:
            formatURL(
              pageMeta?.fields?.careerImage?.fields?.file?.url as string
            ) || DEFAULT_IMAGE_LOADER,
        }}
        className="text-white mt-[128px] lg:mt-[192px] relative"
      >
        <Section
          title={{
            text: t("career:CAREER_VIMEO.TITLE"),
            level: "h2",
            className: "text-white",
          }}
          backgroundColor=""
          className="text-white p-[20px] lg:p-[40px] bg-darkBlue rounded-[12px]"
        >
          <Paragraph className="text-white" type="body_1">
            {t("career:CAREER_VIMEO.PARAGRAPH")}
          </Paragraph>
          <div className="flex flex-row justify-between md:justify-start gap-[16px] md:gap-[24px] w-full">
            <Button
              type="SECONDARY"
              size="lg"
              className="mt-[40px] w-fit"
              disabled={false}
              iconRight="ExternalLink"
              url={pageMeta.fields.vimeoUrl}
              focusRingClassName="xs:ring-offset-darkBlue"
              router={router}
              target="_blank"
            >
              {t("career:CAREER_VIMEO.BUTTON")}
            </Button>
          </div>
        </Section>
      </StackedRightSurface>

      <div className="relative mt-[128px] lg:mt-[192px] mb-[48px] lg:mb-[112px] z-[10]">
        <BgCircleCanvasRight className="absolute right-[-400px] top-[calc(50%_-_400px)] z-[-1]" />
        <Section
          title={{
            text: t("NEWS.TITLE"),
            level: "h2",
            className: "",
          }}
          className="container-wrapper relative "
          childrenContainerClassname="pt-[16px]"
        >
          <div className="md:flex justify-between gap-[40px] ">
            <Paragraph type="body_1" className="">
              {t("NEWS.DESCRIPTION")}
            </Paragraph>
            {/* <Button
              type="PRIMARY"
              size="lg"
              className="mt-[16px] lg:mt-[0]"
              disabled={false}
              iconRight="ArrowRight"
              url="/news"
              router={router}
            >
              {t("NEWS.BUTTON_TEXT")}
            </Button> */}
          </div>
        </Section>
        <NewsCarousel
          deviceType={deviceType}
          news={pageMeta.fields.news.sort(compareArticlesByDate) || []}
          className="mt-[40px] site-wrapper "
          type="NEWS_ARTICLES"
          router={router}
          useVtTranslate={useVtTranslate}
        />
      </div>

      <BottomFooterContainer>
        <div className="flex flex-col lg:flex-row p-[20px] lg:p-[40px] bg-white rounded-[12px] items-center">
          <Section
            title={{
              text: t("PRESS_INQUIRIES.TITLE"),
              level: "h2",
              className: "",
            }}
            backgroundColor=""
            className="lg:w-1/2 border-b lg:border-b-0 lg:border-r lg:pr-[24px] pb-[40px] lg:pb-0"
          >
            <p className="text-[18px]">{t("PRESS_INQUIRIES.DESCRIPTION")}</p>
          </Section>
          <UserCard
            key={Math.random().toString()}
            className="lg:w-1/2 pt-[40px] lg:pt-0"
            employee={pageMeta.fields.ceoCard}
            type="FLEX"
          />
        </div>
      </BottomFooterContainer>
    </>
  );
};

export async function getServerSideProps({
  req,
  locale,
}: GetServerSidePropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "pages__aboutUs",
    locale: getContentfulLocale(locale as string),
    include: 2,
    "fields.platformUrl": VTPlatformURLS.CLINICA_ALPINA,
  });

  return {
    props: {
      deviceType: getDeviceType(req),
      locale,
      ...(await serverSideTranslations(locale as string, [
        "about",
        "common",
        "location",
        "career",
      ])),
      pageMeta: pageMeta.items[0],
    },
  };
}

type AboutPageProps = PageProps<
  {
    deviceType: string;
  },
  CFPageAboutUs
>;

export default About;
