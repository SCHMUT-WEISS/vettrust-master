/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This is a perfect copy of pages/blog/index.tsx
 */
import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import {
  ComponentProps,
  formatURL,
  compareArticlesByDate,
  client,
  PageProps,
  CFPageNews,
  HeroNewsCarousel,
  Section,
  NewsCard,
  Button,
  NewsCarousel,
  NewsLetterCardMobile,
  NewsLetterCardDesktop,
  Hero,
  BgCircleCanvas as BgCircleCanvasRight,
  getContentfulLocale,
  getDeviceType,
  DEFAULT_IMAGE_LOADER,
  VTPlatformURLS,
  platformArticleFilter,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import useVtTranslate from "../../shared/utils/useVtTranslate";
import { currentPracticeSearchStepAtom } from "../../atoms/practiceSearch";
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import { PAGES_WITH_HERO_ANIMATION } from "../../shared/constants/pages";

// eslint-disable-next-line no-use-before-define
const NewsPage: NextPage<ComponentProps<NewsPageProps>> = ({
  pageMeta,
  deviceType,
}) => {
  const { t } = useVtTranslate("blog");
  const router = useRouter();

  const { allArticles } = pageMeta.fields;
  const { heroNews } = pageMeta.fields;
  allArticles
    .filter(platformArticleFilter(process.env.PLATFORM_URLS as string))
    .sort(compareArticlesByDate);
  heroNews
    .filter(platformArticleFilter(process.env.PLATFORM_URLS as string))
    .sort(compareArticlesByDate);

  const [gridArticles, setGridArticles] = React.useState(
    allArticles.slice(0, 6)
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  useEffect(
    () => {
      return () => setCurrentSearchStep(null);
    },
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
    []
  );

  const gridArticlesNodes = useMemo(
    () =>
      gridArticles.map(article => (
        <NewsCard
          news={article}
          key={Math.random().toString()}
          type="NEWS_ARTICLE"
          router={router}
          useVtTranslate={useVtTranslate}
        />
      )),
    [gridArticles]
  );

  return (
    <>
      <Hero
        bgImage={{
          url: formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url),
          smallUrl: formatURL(
            pageMeta.fields?.heroImageSmall?.fields?.file?.url
          ),
          blurDataUrl:
            formatURL(pageMeta?.fields?.heroImage?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
          alt: pageMeta?.fields?.heroImage?.fields?.description,
        }}
        title={t("HERO.TITLE")}
        className=""
        type="HORIZONTAL"
        scrollButtonDisplayed
        scrollButtonExtended={false}
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        {...allAtomsAndI18n}
      >
        <div className="bg-white w-full h-[320px] lg:h-[416px] rounded-[12px] p-[20px] lg:p-[40px]">
          <HeroNewsCarousel
            news={heroNews.slice(0, 5)}
            deviceType={deviceType}
            type="NEWS_ARTICLES"
            router={router}
            useVtTranslate={useVtTranslate}
          />
        </div>
      </Hero>

      <div className="container-wrapper mt-[120px] lg:mt-[136px] relative z-[10] ">
        <BgCircleCanvasRight className="absolute right-[-400px] top-[calc(50%_-_400px)] z-[-1]" />
        <NewsLetterCardMobile
          className=" flex lg:hidden"
          router={router}
          useVtTranslate={useVtTranslate}
        />
        <NewsLetterCardDesktop
          className="mt-[48px] hidden lg:flex"
          router={router}
          useVtTranslate={useVtTranslate}
        />
      </div>

      <Section
        title={{
          text: t("NEWS_PAGE.ALL_ARTICLES.TITLE"),
          level: "h2",
        }}
        backgroundColor=""
        className="container-wrapper mt-[128px] lg:mt-[136px] hidden lg:block"
        childrenContainerClassname="pt-[16px]"
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[32px] justify-center">
          {gridArticlesNodes}
        </div>
        <div className="flex flex-row justify-center mt-[49px] mb-[96px]">
          <Button
            type="PRIMARY"
            size="lg"
            className="text-[16px] mt-[24px]"
            disabled={false}
            iconLeft="Refresh"
            isLoading={isLoadingMore}
            onClick={() => {
              setIsLoadingMore(true);
              setTimeout(() => {
                setGridArticles(allArticles);
                setIsLoadingMore(false);
              }, 1000);
            }}
            router={router}
          >
            {t("NEWS_PAGE.ALL_ARTICLES.LOAD_MORE_BUTTON")}
          </Button>
        </div>
      </Section>

      <Section
        title={{
          text: t("NEWS_PAGE.ALL_ARTICLES.TITLE"),
          level: "h2",
          className: "",
        }}
        backgroundColor=""
        className="container-wrapper relative mt-[128px] lg:mt-[136px] lg:hidden"
      />
      <NewsCarousel
        deviceType={deviceType}
        news={allArticles}
        className="h-[536px] site-wrapper mt-[40px] lg:hidden"
        dotsClassName="lg:hidden mb-[128px] xs:mt-0"
        router={router}
        useVtTranslate={useVtTranslate}
      />
    </>
  );
};

export async function getServerSideProps({
  locale,
  req,
}: GetServerSidePropsContext) {
  const pageMeta = await client.getEntries({
    content_type: "pages__news",
    include: 2,
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
        "location",
      ])),
      pageMeta: pageMeta.items[0],
    },
  };
}

type NewsPageProps = PageProps<
  {
    deviceType: string;
  },
  CFPageNews
>;

export default NewsPage;
