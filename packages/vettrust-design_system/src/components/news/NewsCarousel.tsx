/* eslint-disable no-use-before-define, @typescript-eslint/no-explicit-any,import/named,react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";

import NewsCard from "./NewsCard";
import {
  ComponentProps,
  CFCollectionBlogArticle,
  UseVtTranslateType
} from "../../@types";
import { useWindowDimension } from "../hocs";
import { CarouselDots } from "../carouselDots";
import {
  customLeftArrow,
  customRightArrow,
  getCarouselExtraTransformPixels
} from "../../shared/utils";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.5,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2.3,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.2,
    slidesToSlide: 1
  }
};

const NewsCarousel: React.FC<ComponentProps<NewsCarouselProps>> = ({
  deviceType,
  news = [],
  className,
  type,
  dotsClassName,
  router,
  useVtTranslate
}) => {
  const windowDimensions = useWindowDimension({ onlyX: true });
  const initialOffset = getCarouselExtraTransformPixels(
    windowDimensions,
    responsive
  );

  const [state, setState] = useState({
    additionalTransform: initialOffset.transform - initialOffset.offset,
    currentSlide: 0,
    totalSlides: Math.ceil(news.length / Number(initialOffset.slidesToSlide))
  });

  const RightArrow = customRightArrow();
  const LeftArrow = customLeftArrow();

  useEffect(
    () => {
      setState({
        ...state,
        additionalTransform: initialOffset.transform - initialOffset.offset,
        totalSlides: Math.ceil(
          news.length / Number(initialOffset.slidesToSlide)
        )
      });
    },
    // CAUTION ⚠️: Never add initialOffset in the dependency array, it will lead to an infinite loop
    [windowDimensions]
  );

  const Content = useMemo(() => {
    return news
      .filter((el) => el.fields)
      .map((el) => (
        <NewsCard
          news={el}
          key={Math.random().toString()}
          className=""
          type={type === "NEWS_ARTICLES" ? "NEWS_ARTICLE" : "BLOG_ARTICLE"}
          router={router}
          useVtTranslate={useVtTranslate}
        />
      ));
  }, [news]);

  return (
    <React.Fragment>
      <div className={`relative site-wrapper ${className} `}>
        {/* @ts-ignore */}
        <Carousel
          draggable={false}
          swipeable
          responsive={responsive}
          ssr
          showDots
          containerClass=""
          deviceType={deviceType}
          customRightArrow={<RightArrow />}
          customLeftArrow={<LeftArrow />}
          renderDotsOutside
          renderArrowsWhenDisabled
          keyBoardControl
          dotListClass="news-carousel-dots"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          additionalTransfrom={state.additionalTransform}
          beforeChange={(nextSlide, carouselState) => {
            const allDots = document.querySelectorAll(
              ".news-carousel-dots > .react-multi-carousel-dot"
            );

            const newOffset = getCarouselExtraTransformPixels(
              windowDimensions,
              responsive
            );
            const lastSlide =
              carouselState.totalItems - carouselState.slidesToShow;
            const firstSlideTransform = newOffset.transform - newOffset.offset;

            if (nextSlide === 0) {
              setState({
                totalSlides:
                  state.totalSlides !== allDots.length
                    ? allDots.length
                    : state.totalSlides,
                additionalTransform: firstSlideTransform,
                currentSlide: Math.ceil(
                  nextSlide / Number(initialOffset.slidesToSlide)
                )
              });
            } else if (
              nextSlide === lastSlide &&
              state.additionalTransform !== -newOffset.transform
            ) {
              setState({
                totalSlides:
                  state.totalSlides !== allDots.length
                    ? allDots.length
                    : state.totalSlides,
                additionalTransform: -newOffset.transform,
                currentSlide: Math.ceil(
                  nextSlide / Number(initialOffset.slidesToSlide)
                )
              });
            } else if (nextSlide !== 0) {
              setState({
                totalSlides:
                  state.totalSlides !== allDots.length
                    ? allDots.length
                    : state.totalSlides,
                additionalTransform: 0,
                currentSlide: Math.ceil(
                  nextSlide / Number(initialOffset.slidesToSlide)
                )
              });
            }
          }}
        >
          {Content}
        </Carousel>
      </div>
      <CarouselDots
        activeDotColor="#D52F89"
        centerDots={3}
        currentSlide={state.currentSlide}
        dotColor="rgba(0, 0, 0, 0)"
        totalSlides={state.totalSlides}
        className={`mt-[40px] ${dotsClassName}`}
      />
    </React.Fragment>
  );
};

interface NewsCarouselProps {
  deviceType: string;
  news: CFCollectionBlogArticle[];
  type?: "BLOG_ARTICLES" | "NEWS_ARTICLES";
  dotsClassName?: string;
  router: any;
  useVtTranslate: UseVtTranslateType;
}

export default NewsCarousel;
