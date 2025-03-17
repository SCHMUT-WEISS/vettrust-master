/* This carousel is also for news cards but only ones that can be displayed in the hero component under /blog/index.tsx or /news/index.tsx */
/* eslint-disable no-use-before-define, @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import {
  ComponentProps,
  CFCollectionBlogArticle,
  UseVtTranslateType
} from "../../@types";
import HeroNewsCard from "./HeroNewsCard";
import { NextRouter } from "../../@types/next";

const HeroNewsCarousel: React.FC<ComponentProps<HeroNewsCarouselProps>> = ({
  deviceType,
  news = [],
  className,
  type,
  router,
  useVtTranslate
}) => {
  const [responsive] = useState({
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 1,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  });

  const newsNodes = useMemo(
    () =>
      news.map((newsItem) => (
        <HeroNewsCard
          news={newsItem}
          key={Math.random().toString()}
          type={type === "NEWS_ARTICLES" ? "NEWS_ARTICLE" : "BLOG_ARTICLE"}
          router={router}
          useVtTranslate={useVtTranslate}
        />
      )),
    [news, type]
  );

  return (
    <div className={`relative ${className}`}>
      {/* @ts-ignore */}
      <Carousel
        draggable
        swipeable
        responsive={responsive}
        ssr
        showDots
        itemClass="image-item w-full"
        deviceType={deviceType}
        renderDotsOutside
        keyBoardControl
        dotListClass="hero-news-carousel__dots-list"
        autoPlay
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        rewind
        autoPlaySpeed={8000}
      >
        {newsNodes}
      </Carousel>
    </div>
  );
};

interface HeroNewsCarouselProps {
  deviceType: string;
  news: CFCollectionBlogArticle[];
  type?: "NEWS_ARTICLES" | "BLOG_ARTICLES";
  router: NextRouter;
  useVtTranslate: UseVtTranslateType;
}

export default HeroNewsCarousel;
