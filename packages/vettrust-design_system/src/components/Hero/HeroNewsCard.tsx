/* eslint-disable no-use-before-define, @typescript-eslint/no-explicit-any */
import React from "react";
import {
  ComponentProps,
  CFCollectionBlogArticle,
  UseVtTranslateType
} from "../../@types";
import Avatar from "../shared/Avatar";
import Paragraph from "../shared/Paragraph";
import Button from "../shared/Button";
import Section from "../shared/Section";
import { NextRouter } from "../../@types/next";

const HeroNewsCard: React.FC<ComponentProps<HeroNewsCardProps>> = ({
  news,
  type,
  router,
  useVtTranslate
}) => {
  const { t } = useVtTranslate("about");
  const summary = news.fields.body.content
    .map((node: any) => node.content[0]?.value)
    .join(" ");

  const redirectTo =
    type === "NEWS_ARTICLE"
      ? `/news/${news.fields.slug}`
      : `/blog/${news.fields.slug}`;

  const gtmTracker =
    type === "NEWS_ARTICLE" ? "gtm-news-article-hero" : "gtm-blog-article-hero";

  const publishedAt = Date.parse(news.fields.publishedAt);

  return (
    <div className="bg-white h-[280px] lg:h-[336px] relative">
      <Avatar
        author={news.fields.author}
        type="HERO_AUTHOR_DISPLAY"
        date={publishedAt}
      />
      <Section
        title={{
          text: news.fields.name,
          level: "h3"
        }}
        backgroundColor=""
        className="mt-[16px] hidden lg:block"
      >
        <Paragraph
          type="body_2"
          className="w-full h-[96px] line-clamp-4 text-lightBlue-pressed"
        >
          {summary}
        </Paragraph>
        <Button
          type="PRIMARY"
          size="lg"
          className={`absolute bottom-0 text-[16px] ${gtmTracker}`}
          disabled={false}
          iconRight="ArrowRight"
          url={redirectTo}
          style={{
            boxShadow: "unset"
          }}
          tabIndex={-1}
          router={router}
        >
          {t("PRACTICE_OWNER.MORE_INFO")}
        </Button>
      </Section>
      <Section
        title={{
          text: news.fields.name,
          level: "h4",
          className: "line-clamp-2"
        }}
        backgroundColor=""
        className="mt-[16px] block lg:hidden"
        dividerClassName="hidden"
        dividerSmallClassName="hidden"
      >
        <Paragraph
          type="body_2"
          className="w-full h-[120px] md:h-[96px] line-clamp-5 md:line-clamp-4 mt-[8px]"
        >
          {summary}
        </Paragraph>
        <Button
          type="TERTIARY"
          size="lg"
          className={`border-0 lg:flex px-0 absolute bottom-0 text-[16px] h-[24px] w-fit mt-[8px] ${gtmTracker}`}
          disabled={false}
          iconRight="ArrowRightDanger"
          url={redirectTo}
          style={{
            boxShadow: "unset"
          }}
          router={router}
        >
          {t("PRACTICE_OWNER.MORE_INFO")}
        </Button>
      </Section>
    </div>
  );
};

interface HeroNewsCardProps {
  news: CFCollectionBlogArticle;
  type?: "NEWS_ARTICLE" | "BLOG_ARTICLE";
  router: NextRouter;
  useVtTranslate: UseVtTranslateType;
}

export default HeroNewsCard;
