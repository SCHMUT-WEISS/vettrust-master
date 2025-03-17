/* eslint-disable no-use-before-define, @typescript-eslint/no-explicit-any,import/named,react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import { ComponentProps } from "../../@types";
import { CfCollectionTestimonial } from "../../@types/content/CFCollectionTestimonial";
import TestimonialCard from "./TestimonialCard";
import {
  customLeftArrow,
  customRightArrow,
  getCarouselExtraTransformPixels
} from "../../shared/utils/elements/carousel";
import { useWindowDimension } from "../hocs/useWindowDimensions";
import { CarouselDots } from "../carouselDots";

const initialResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.5,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.2,
    slidesToSlide: 1
  }
};

const TestimonialsCarousel: React.FC<
  ComponentProps<TestimonialsCarouselCarouselProps>
> = ({
  deviceType,
  testimonials = [],
  className,
  responsive = initialResponsive,
  dotsClassName
}) => {
  const windowDimensions = useWindowDimension();

  const initialOffset = getCarouselExtraTransformPixels(
    windowDimensions,
    responsive
  );

  const [state, setState] = useState({
    additionalTransform: initialOffset.transform - initialOffset.offset,
    currentSlide: 0,
    totalSlides: Math.ceil(
      testimonials.length / Number(initialOffset.slidesToSlide)
    )
  });

  const RightArrow = customRightArrow();
  const LeftArrow = customLeftArrow();

  useEffect(
    () => {
      setState({
        ...state,
        additionalTransform: initialOffset.transform - initialOffset.offset,
        totalSlides: Math.ceil(
          testimonials.length / Number(initialOffset.slidesToSlide)
        )
      });
    },
    // CAUTION ⚠️: Never add initialOffset in the dependency array, it will lead to an infinite loop
    [windowDimensions]
  );

  return (
    <React.Fragment>
      <div className={`relative ${className}`}>
        {/* @ts-ignore */}
        <Carousel
          draggable={false}
          swipeable
          responsive={responsive}
          ssr
          showDots
          containerClass={` `}
          itemClass=""
          deviceType={deviceType}
          customRightArrow={<RightArrow />}
          customLeftArrow={<LeftArrow />}
          renderDotsOutside
          keyBoardControl
          dotListClass="testimonials-carousel-dots"
          renderArrowsWhenDisabled
          removeArrowOnDeviceType={["tablet", "mobile"]}
          additionalTransfrom={state.additionalTransform}
          beforeChange={(nextSlide, carouselState) => {
            const allDots = document.querySelectorAll(
              ".testimonials-carousel-dots > .react-multi-carousel-dot"
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
          {testimonials
            .filter((el) => el.fields)
            .map((testimonial) => (
              <TestimonialCard
                testimonial={testimonial}
                key={Math.random().toString()}
                className=""
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

interface TestimonialsCarouselCarouselProps {
  deviceType: string;
  testimonials: CfCollectionTestimonial[];
  responsive?: ResponsiveType;
  dotsClassName?: string;
}

export default TestimonialsCarousel;
