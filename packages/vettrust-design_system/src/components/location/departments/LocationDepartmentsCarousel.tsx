/* eslint-disable no-use-before-define,react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import {
  ComponentProps,
  UseVtTranslateType,
  CFCollectionDepartment
} from "../../../@types";
import { useWindowDimension } from "../../hocs";
import {
  customLeftArrow,
  customRightArrow,
  getCarouselExtraTransformPixels
} from "../../../shared/utils";
import LocationDepartmentCard from "./LocationDepartmentCard";
import { CarouselDots } from "../../carouselDots";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4.7,
    slidesToSlide: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2.3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.2,
    slidesToSlide: 1
  }
};

const LocationDepartmentsCarousel: React.FC<
  ComponentProps<LocationDepartmentsCarouselProps>
> = ({
  className,
  departments,
  locationSlug,
  dotsClassName,
  useVtTranslate,
  router
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
      departments.length / Number(initialOffset.slidesToSlide)
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
          departments.length / Number(initialOffset.slidesToSlide)
        )
      });
    },
    // CAUTION ⚠️: Never add initialOffset in the dependency array, it will lead to an infinite loop
    [windowDimensions]
  );

  const departmentsNodes = useMemo(
    () =>
      departments
        .filter((el) => el.fields)
        .map((el) => (
          <LocationDepartmentCard
            department={el}
            key={Math.random().toString()}
            className=""
            locationSlug={locationSlug}
            router={router}
            useVtTranslate={useVtTranslate}
          />
        )),
    [departments]
  );

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
          itemClass="w-[352px]"
          customRightArrow={<RightArrow />}
          customLeftArrow={<LeftArrow />}
          renderDotsOutside
          renderArrowsWhenDisabled
          keyBoardControl
          dotListClass="location-departments-carousel-dots"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          additionalTransfrom={state.additionalTransform}
          beforeChange={(nextSlide, carouselState) => {
            const allDots = document.querySelectorAll(
              ".location-departments-carousel-dots > .react-multi-carousel-dot"
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
          {departmentsNodes}
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

interface LocationDepartmentsCarouselProps {
  departments: CFCollectionDepartment[];
  locationSlug: string;
  dotsClassName?: string;
  useVtTranslate: UseVtTranslateType;
  router: any;
}

export default LocationDepartmentsCarousel;
