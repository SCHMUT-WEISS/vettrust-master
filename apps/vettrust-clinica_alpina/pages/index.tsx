/* eslint-disable security/detect-object-injection */
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { useAtom } from "jotai";
import {
  Hero,
  Paragraph,
  BulletCardsGrid,
  Section,
  TestimonialsCarousel,
  StackedRightSurface,
  Button,
  BgCircleCanvas as BgCircleCanvasRight,
  NewsCarousel,
  BottomFooterContainer,
  NewsLetterCardMobile,
  NewsLetterCardDesktop,
  PageProps,
  ComponentProps,
  compareArticlesByDate,
  formatURL,
  CFPageHome,
  BulletCard,
  getDeviceType,
  getContentfulLocale,
  DEFAULT_IMAGE_LOADER,
  useAllLocations,
  IconsT as Icons,
  VTPlatformURLS,
  platformArticleFilter,
  client,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import useVtTranslate from "../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../atoms/practiceSearch";
import { PAGES_WITH_HERO_ANIMATION } from "../shared/constants/pages";
import { allAtomsAndI18n } from "../shared/utils/designSystem";

// eslint-disable-next-line no-use-before-define
const Home: NextPage<ComponentProps<HomePageProps>> = ({
  pageMeta,
  deviceType,
}) => {
  const { t } = useVtTranslate("home");
  const bulletsIcons: Array<keyof Icons> = ["PuzzleDanger", "MedicineDanger"];

  const { news } = pageMeta.fields;
  news
    // Remove articles which don't have a fields prop
    .filter(article => article.fields)
    .filter(platformArticleFilter(process.env.PLATFORM_URLS as string))
    .sort(compareArticlesByDate);

  const bulletCards = bulletsIcons.map(
    (icon, index) =>
      ({
        title: t("BULLET_CARDS_GRID.BULLETS.TITLE", { context: index + 1 }),
        description: t("BULLET_CARDS_GRID.BULLETS.DESCRIPTION", {
          context: index + 1,
        }),
        icon,
      } as BulletCard)
  );

  useAllLocations(allAtomsAndI18n);

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  useEffect(
    () => {
      return () => setCurrentSearchStep(null);
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  const router = useRouter();

  return (
    <div className="relative">
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
        className="z-0"
        scrollButtonDisplayed
        displayChildrenInSection
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        isSearchHidden
        {...allAtomsAndI18n}
      >
        <Paragraph type="body_1" className="text-white invisible">
          {t("HERO.DESCRIPTION")}
        </Paragraph>
      </Hero>

      <BulletCardsGrid
        title={t("BULLET_CARDS_GRID.TITLE")}
        bulletCards={bulletCards}
        className="mt-[212px] lg:mt-[240px] "
        showBgCanvas
        gridColumns={2}
      />

      {pageMeta.fields.testimonials?.length > 0 && (
        <>
          <Section
            title={{
              text: t("NEWS.TITLE"),
              level: "h2",
              className: "",
            }}
            className="container-wrapper mt-[128px] lg:mt-[192px] "
          />

          <TestimonialsCarousel
            deviceType={deviceType}
            testimonials={pageMeta.fields.testimonials}
            className="mt-[40px] site-wrapper"
          />
        </>
      )}

      <StackedRightSurface
        image={{
          src: formatURL(
            pageMeta?.fields?.ourRoleSectionImage?.fields?.file?.url
          ),
          alt: pageMeta?.fields?.ourRoleSectionImage?.fields?.description,
          blurDataUrl:
            formatURL(pageMeta.fields.ourRoleSectionImage.fields.file.url) ||
            DEFAULT_IMAGE_LOADER,
        }}
        className="text-white mt-[128px] lg:mt-[192px] relative"
      >
        <Section
          title={{
            text: t("OUR_ROLES_SECTION.TITLE"),
            level: "h2",
            className: "text-white",
          }}
          backgroundColor=""
          className="text-white p-[20px] lg:p-[40px] bg-darkBlue rounded-[12px]"
        >
          <Paragraph className="text-white" type="body_1">
            {t("OUR_ROLES_SECTION.DESCRIPTION")}
          </Paragraph>
          <div className="flex flex-row justify-between md:justify-start gap-[16px] md:gap-[24px] w-full">
            <Button
              type="SECONDARY"
              size="lg"
              className="mt-[40px] w-[calc(50%_-_8px)] md:w-fit"
              disabled={false}
              iconRight="ArrowRight"
              url="/about"
              focusRingClassName="xs:ring-offset-darkBlue"
              router={router}
            >
              {t("OUR_ROLES_SECTION.ABOUT_US")}
            </Button>
          </div>
        </Section>
      </StackedRightSurface>

      <div className="relative lg:mt-[192px] z-[10]">
        <BgCircleCanvasRight className="absolute right-[-400px] top-[calc(50%_-_400px)] z-[-1]" />
        <Section
          title={{
            text: t("NEWS.TITLE"),
            level: "h2",
            className: "mt-[128px] lg:mt-[192px]",
          }}
          className="container-wrapper"
        >
          <div className="md:flex justify-between gap-[40px] ">
            <Paragraph type="body_1" className="">
              {t("NEWS.DESCRIPTION")}
            </Paragraph>
            <Button
              type="PRIMARY"
              size="lg"
              className="mt-[16px] lg:mt-[0]"
              disabled={false}
              iconRight="ArrowRight"
              url="/blog"
              router={router}
            >
              {t("NEWS.BUTTON_TEXT")}
            </Button>
          </div>
        </Section>
        <NewsCarousel
          deviceType={deviceType}
          news={news}
          className="mt-[40px]"
          useVtTranslate={useVtTranslate}
          router={router}
        />
      </div>

      <BottomFooterContainer>
        <NewsLetterCardMobile
          type="home"
          className="mt-[48px] lg:mt-[112px] flex lg:hidden"
          useVtTranslate={useVtTranslate}
          router={router}
        />
        <NewsLetterCardDesktop
          type="home"
          className="mt-[48px] lg:mt-[112px] hidden lg:flex"
          useVtTranslate={useVtTranslate}
          router={router}
        />
      </BottomFooterContainer>
    </div>
  );
};

export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "pages__home",
    include: 2,
    locale: getContentfulLocale(locale as string),
    "fields.platformUrl": VTPlatformURLS.CLINICA_ALPINA,
  });

  return {
    props: {
      locale,
      deviceType: getDeviceType(req),
      ...(await serverSideTranslations(locale as string, [
        "home",
        "common",
        "about",
        "blog",
        "location",
      ])),
      pageMeta: pageMeta.items[0],
    },
  };
}

type HomePageProps = PageProps<
  {
    deviceType: string;
  },
  CFPageHome
>;

export default Home;
