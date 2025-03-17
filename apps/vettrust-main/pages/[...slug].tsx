import {
  getStoryblokApi,
  ISbStoriesParams,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

type StoryblokVersion = "published" | "draft" | undefined;

interface Paths {
  params: {
    slug: string[];
  };
  locale: any;
}

export async function getStaticProps({
  params,
  locale,
  preview = false,
}: Paths & GetStaticPropsContext) {
  const slug = params.slug ? params.slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();
  const sbParams: ISbStoriesParams = {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION as StoryblokVersion,
    language: locale,
  };

  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }

  const { data } = await storyblokApi
    .get(`cdn/stories/${slug}`, sbParams)
    .catch(err => err);

  if (!data || !data.story) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      locale,
      ...(await serverSideTranslations(locale)),
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 10, // revalidate the page every 10 secs
  };
}

export default function Page({
  story: initialStory,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const story = useStoryblokState(initialStory);
  const blok = story?.content;

  if (blok === undefined) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{story ? story.name : "VetTrust"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StoryblokComponent blok={blok} />
    </>
  );
}

export async function getStaticPaths({ locales }: { locales: any }) {
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/links/", {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION as StoryblokVersion,
  });

  const paths: Paths[] = [];

  Object.values(data.links).forEach((link: any) => {
    if (link.is_folder || link.slug === "home") {
      return;
    }

    const { slug } = link;
    const splittedSlug = slug.split("/");

    locales.forEach((locale: any) => {
      paths.push({ params: { slug: splittedSlug }, locale });
    });
  });

  return {
    paths,
    fallback: "blocking",
  };
}
