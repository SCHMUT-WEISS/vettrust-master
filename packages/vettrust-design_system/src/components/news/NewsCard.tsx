/* eslint-disable no-use-before-define, @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";

import {
  ComponentProps,
  CFCollectionBlogArticle,
  UseVtTranslateType
} from "../../@types";
import Avatar from "../shared/Avatar";
import VTImage from "../shared/VTImage";
import Heading from "../shared/Heading";
import Paragraph from "../shared/Paragraph";
import Button from "../shared/Button";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";
import { formatURL } from "../../shared/utils";

const NewsCard: React.FC<ComponentProps<NewsCardProps>> = ({
  news,
  className,
  type,
  router,
  useVtTranslate
}) => {
  const { t } = useVtTranslate("about");
  const summary = news.fields.body.content
    .map((node: any) => {
      return node.content.map((el: any) => el.value).join(" ");
    })
    .join(" ");

  const redirectTo =
    type === "NEWS_ARTICLE"
      ? `${router.locale}/news/${news.fields.slug}`
      : `${router.locale}/blog/${news.fields.slug}`;

  const gtmTracker =
    type === "NEWS_ARTICLE" ? "gtm-news-article" : "gtm-blog-article";

  const publishedAt = Date.parse(news.fields.publishedAt);

  return (
    <div
      className={`news-card-wrapper h-full cursor-pointer ${gtmTracker} ${className}`}
    >
      <Link
        legacyBehavior={false}
        href={redirectTo}
        onClick={() => {
          // @ts-ignore
          return window?.dataLayer?.push({
            event: gtmTracker,
            articleTitle: news.fields.name
          });
        }}
      >
        <div
          className="bg-white p-[12px] lg:p-[16px] rounded-[12px] relative flex flex-col gap-[20px] h-full"
          style={{
            boxShadow:
              "0px 2px 8px rgba(208, 145, 29, 0.02), 0px 12px 32px rgba(208, 145, 29, 0.12)"
          }}
        >
          <div className="h-[171px] overflow-hidden rounded-[8px] object-cover relative ">
            <VTImage
              src={formatURL(news?.fields?.thumbnail?.fields?.file?.url)}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL={
                formatURL(news?.fields?.thumbnail?.fields?.file?.url) ||
                DEFAULT_IMAGE_LOADER
              }
              alt={news?.fields?.thumbnail?.fields?.description}
            />
          </div>
          <div className="flex-auto flex flex-col justify-between px-[8px] pb-[8px]">
            <div>
              <Avatar
                author={news.fields.author}
                type="AUTHOR_DISPLAY"
                date={publishedAt}
              />
              <Heading
                text={news.fields.name}
                level="h4"
                className="text-[20px] whitespace-nowrap truncate mt-[16px]"
              />
              <Paragraph
                type="body_2"
                className="w-full h-[120px] line-clamp-5 mt-[4px] text-darkBlue"
              >
                {summary}
              </Paragraph>
            </div>
            <Button
              type="TERTIARY"
              size="sm"
              className={`border-0 p-0 text-[16px] justify-start mt-[16px] h-[24px] ${gtmTracker}`}
              disabled={false}
              iconRight="ArrowRightDanger"
              focusRingClassName="xs:ring-offset-white"
              router={router}
              onClick={() => {
                // @ts-ignore
                return window?.dataLayer?.push({
                  event: gtmTracker,
                  articleTitle: news.fields.name
                });
              }}
            >
              {t("PRACTICE_OWNER.MORE_INFO")}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

interface NewsCardProps {
  news: CFCollectionBlogArticle;
  type?: "BLOG_ARTICLE" | "NEWS_ARTICLE";
  router: any;
  useVtTranslate: UseVtTranslateType;
}

export default NewsCard;
