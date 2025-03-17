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
import { allAtomsAndI18n } from "../../shared/utils/designSystem";
import { PAGES_WITH_HERO_ANIMATION } from "../../shared/constants/pages";
import useVtTranslate from "../../shared/utils/useVtTranslate";

// eslint-disable-next-line no-use-before-define
const BlogArticlePage: NextPage<ComponentProps<BlogArticleProps>> = ({
  blog,
  slugsList,
}) => {
  const [currentBlogArticle, setCurrentBlogArticle] = useAtom(
    currentBlogArticleAtom
  );
  const [blogArticleSlugList, setBlogArticlesSlugList] = useAtom(
    navigationDynamicSlugListAtom
  );
  const publishedAt = Date.parse(blog.fields.publishedAt);
  const router = useRouter();

  const [, setCurrentSearchStep] = useAtom(currentPracticeSearchStepAtom);

  useEffect(() => {
    if (currentBlogArticle?.slug !== blog.fields.slug) {
      setCurrentBlogArticle(blog.fields);
    }

    if (blogArticleSlugList.length === 0) {
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
          url: formatURL(blog?.fields?.thumbnail?.fields?.file?.url),
          smallUrl: formatURL(blog.fields.thumbnail?.fields?.file?.url),
          blurDataUrl:
            formatURL(blog?.fields?.thumbnail?.fields?.file?.url) ||
            DEFAULT_IMAGE_LOADER,
          alt: blog?.fields?.thumbnail?.fields?.description,
        }}
        title={blog.fields.name}
        className=""
        displayChildrenInSection
        router={router}
        PAGES_WITH_HERO_ANIMATION={PAGES_WITH_HERO_ANIMATION}
        {...allAtomsAndI18n}
      />
      <div className="container-wrapper mb-[92px] mt-[64px] lg:mt-[96px] flex flex-row justify-center">
        <div className="max-w-[758px]">
          <Avatar
            author={blog.fields.author}
            type="BLOG_AUTHOR_DISPLAY"
            date={publishedAt}
          />
          <hr className="border-sand-pressed border-t-[1px] my-[24px]" />
          <RichTextRenderer
            document={blog.fields.body}
            useVtTranslate={useVtTranslate}
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({
  locale,
  params: { blog_slug },
}: GetStaticPropsContext<any>) {
  const blogs = await client.getEntries<BlogArticleFields>({
    content_type: "collection__blogArticle",
    "fields.slug": blog_slug,
    locale: getContentfulLocale(locale as string),
  });

  const slugsList = await getDynamicPageSlugsStaticPaths(
    "collection__blogArticle",
    "blog_slug",
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
      blog: blogs.items[0],
    },
  };
}

export async function getStaticPaths() {
  const paths = (
    await getDynamicPageSlugsStaticPaths(
      "collection__blogArticle",
      "blog_slug",
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
  blog: CFCollectionBlogArticle;
  slugsList: NextJsStaticPath[];
}>;

export default BlogArticlePage;
