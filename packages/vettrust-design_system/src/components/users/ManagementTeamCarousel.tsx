/* eslint-disable no-use-before-define, @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { ComponentProps } from "../../@types";
import UserCard from "./UserCard";
import { CfCollectionEmployee } from "../../@types/content/CFCollectionEmployee";
import {
  customRightArrow,
  customLeftArrow,
  getCarouselExtraTransformPixels
} from "../../shared/utils/elements/carousel";
import { useWindowDimension } from "../hocs/useWindowDimensions";
import { CarouselDots } from "../carouselDots";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.5,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2.3,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.2,
    slidesToSlide: 1
  }
};

const ManagementCarousel: React.FC<ComponentProps<ManagementCarouselProps>> = ({
  deviceType,
  employees = [],
  className
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
      employees.length / Number(initialOffset.slidesToSlide)
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
          employees.length / Number(initialOffset.slidesToSlide)
        )
      });
    },
    // CAUTION ⚠️: Never add initialOffset in the dependency array, it will lead to an infinite loop
    [windowDimensions]
  );

  return (
    <React.Fragment>
      <div className={`relative ${className} `}>
        {/* @ts-ignore */}
        <Carousel
          draggable={false}
          swipeable
          responsive={responsive}
          ssr
          showDots
          renderDotsOutside
          itemClass="image-item"
          dotListClass="management-carousel-dots"
          deviceType={deviceType}
          customRightArrow={<RightArrow />}
          customLeftArrow={<LeftArrow />}
          keyBoardControl
          rewind
          additionalTransfrom={state.additionalTransform}
          beforeChange={(nextSlide, carouselState) => {
            const allDots = document.querySelectorAll(
              ".management-carousel-dots > .react-multi-carousel-dot"
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
          {employees
            .filter((el) => el.fields)
            .map((employee) => (
              <UserCard
                key={employee.sys.id}
                className=""
                employee={employee}
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
        className="mt-[40px] lg:hidden"
      />
    </React.Fragment>
  );
};

interface ManagementCarouselProps {
  deviceType: string;
  employees: CfCollectionEmployee[];
}

export default ManagementCarousel;
