/**
 * This is a perfect copy of pages/blog/[blog_slug].tsx
 */
/* eslint-disable camelcase,@typescript-eslint/no-explicit-any */
import { GetStaticPropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import {
  ComponentProps,
  client,
  BlogArticleFields,
  CFCollectionBlogArticle,
  formatURL,
  Avatar,
  RichTextRenderer,
  PageProps,
  Hero,
  getContentfulLocale,
  getDynamicPageSlugsStaticPaths,
  NextJsStaticPath,
  DEFAULT_IMAGE_LOADER,
  VTPlatformURLS,
} from "@somethingcreative-agency/vettrust-design_system";
import { useRouter } from "next/router";
import { currentBlogArticleAtom } from "../../atoms/articles";
import { navigationDynamicSlugListAtom } from "../../atoms/navigation";
import { currentPracticeSearchStepAtom } from "../../atoms/practiceSearch";
import { PAGES_WITH_HERO_ANIMATION } from "../../shared/constants/pages";
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import useVtTranslate from "../../shared/utils/useVtTranslate";

// eslint-disable-next-line no-use-before-define
const NewsArticlePage: NextPage<ComponentProps<BlogArticleProps>> = ({
  news,
  slugsList,
}) => {
  const [currentNewsArticle, setCurrentNewsArticle] = useAtom(
    currentBlogArticleAtom
  );
  const [newsArticleSlugList, setBlogArticlesSlugList] = useAtom(
    navigationDynamicSlugListAtom
  );
  const router = useRouter();

  const publishedAt = Date.parse(news.fields.publishedAt);
  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  useEffect(() => {
    if (currentNewsArticle?.slug !== news.fields.slug) {
      setCurrentNewsArticle(news.fields);
    }

    if (newsArticleSlugList.length === 0) {
      setBlogArticlesSlugList(slugsList);
    }

    return () => {
      setBlogArticlesSlugList([]);
      setCurrentSearchStep(null);
    };
    // ⚠️ Don't update the dependency array, otherwise it goes into an infinite loop ⚠️
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Hero
        bgImage={{
          url: formatURL(news?.fields?.thumbnail?.fields?.file?.url),
          smallUrl: formatURL(news?.fields?.thumbnail?.fields?.file?.url),
          blurDataUrl:
            formatURL(news?.fields?.thumbnail?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
          alt: news?.fields?.thumbnail?.fields?.description,
        }}
        title={news.fields.name}
        className=""
        displayChildrenInSection
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        router={router}
        {...allAtomsAndI18n}
      />
      <div className="container-wrapper mb-[92px] mt-[64px] lg:mt-[96px] flex flex-row justify-center">
        <div className="max-w-[758px]">
          <Avatar
            author={news.fields.author}
            type="BLOG_AUTHOR_DISPLAY"
            date={publishedAt}
          />
          <hr className="border-sand-pressed border-t-[1px] my-[24px]" />
          <RichTextRenderer
            document={news.fields.body}
            useVtTranslate={useVtTranslate}
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({
  locale,
  params: { news_slug },
}: GetStaticPropsContext<any>) {
  const news = await client.getEntries<BlogArticleFields>({
    content_type: "collection__newsArticles",
    "fields.slug": news_slug,
    locale: getContentfulLocale(locale as string),
  });

  const slugsList = await getDynamicPageSlugsStaticPaths(
    "collection__newsArticles",
    "news_slug",
    {
      "fields.pageUrl[in]":
        process.env.PLATFORM_URLS || [VTPlatformURLS.VETTRUST].join(","),
    }
  );

  return {
    props: {
      locale,
      slugsList,
      ...(await serverSideTranslations(locale as string, [
        "blog",
        "common",
        "about",
        "location",
      ])),
      news: news.items[0],
    },
  };
}

export async function getStaticPaths() {
  const paths = (
    await getDynamicPageSlugsStaticPaths(
      "collection__newsArticles",
      "news_slug",
      {
        "fields.pageUrl[in]":
          process.env.PLATFORM_URLS || [VTPlatformURLS.VETTRUST].join(","),
      }
    )
  ).map(el => ({ params: el.params, locale: el.locale }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths: paths || [],
    fallback: false,
  };
}

type BlogArticleProps = PageProps<{
  news: CFCollectionBlogArticle;
  slugsList: NextJsStaticPath[];
}>;

export default NewsArticlePage;
