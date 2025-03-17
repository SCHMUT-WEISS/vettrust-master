/* eslint-disable no-use-before-define, @typescript-eslint/no-explicit-any,import/named,react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { ComponentProps, UseVtTranslateType, VTRating } from "../../@types";
import {
  customLeftArrow,
  customRightArrow,
  getCarouselExtraTransformPixels
} from "../../shared/utils";
import { useWindowDimension } from "../hocs";
import RatingCard from "./RatingCard";
import { CarouselDots } from "../carouselDots";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.5,
    slidesToSlide: 2
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

const RatingCarousel: React.FC<ComponentProps<RatingsCarouselProps>> = ({
  ratings = [],
  className,
  dotsClassName,
  useVtTranslate
}) => {
  const windowDimensions = useWindowDimension();
  const initialOffset = getCarouselExtraTransformPixels(
    windowDimensions,
    responsive
  );

  const [state, setState] = useState({
    additionalTransform: initialOffset.transform - initialOffset.offset,
    currentSlide: 0,
    totalSlides: Math.ceil(ratings.length / Number(initialOffset.slidesToSlide))
  });

  const RightArrow = customRightArrow();
  const LeftArrow = customLeftArrow();

  useEffect(
    () => {
      setState({
        ...state,
        additionalTransform: initialOffset.transform - initialOffset.offset,
        totalSlides: Math.ceil(
          ratings.length / Number(initialOffset.slidesToSlide)
        )
      });
    },
    // CAUTION ⚠️: Never add initialOffset in the dependency array, it will lead to an infinite loop
    [windowDimensions]
  );

  return (
    <React.Fragment>
      <div className={`relative site-wrapper ${className} `}>
        {/* @ts-ignore */}
        <Carousel
          draggable={false}
          swipeable
          responsive={responsive}
          showDots
          containerClass=""
          itemClass="w-[352px]"
          customRightArrow={<RightArrow />}
          customLeftArrow={<LeftArrow />}
          renderDotsOutside
          renderArrowsWhenDisabled
          keyBoardControl
          dotListClass="ratings-carousel-dots"
          additionalTransfrom={state.additionalTransform}
          beforeChange={(nextSlide, carouselState) => {
            const allDots = document.querySelectorAll(
              ".ratings-carousel-dots > .react-multi-carousel-dot"
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
          {ratings.map((el) => (
            <RatingCard
              key={Math.random().toString()}
              className=""
              rating={el}
              useVtTranslate={useVtTranslate}
            />
          ))}
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

interface RatingsCarouselProps {
  ratings: VTRating[];
  dotsClassName?: string;
  useVtTranslate: UseVtTranslateType;
}

export default RatingCarousel;
