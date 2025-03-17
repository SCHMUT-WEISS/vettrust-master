/* eslint-disable no-use-before-define,react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import { Asset } from "contentful";
import { useAtom } from "jotai";
import {
  ComponentProps,
  UseVtTranslateType,
  VTAtom,
  CfCollectionService,
  ModalsState
} from "../../../@types";
import { useWindowDimension } from "../../hocs";
import {
  customLeftArrow,
  customRightArrow,
  getCarouselExtraTransformPixels,
  randomStringGenerator
} from "../../../shared/utils";
import ServiceCard from "./LocationServiceCard";
import { CarouselDots } from "../../carouselDots";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4.7,
    slidesToSlide: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3.3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1.2,
    slidesToSlide: 1
  }
};

const LocationServicesCarousel: React.FC<
  ComponentProps<LocationServicesCarouselProps>
> = ({
  className,
  services,
  defaultServiceImage,
  dotsClassName,
  notWrapped,
  currentModalAtom,
  currentlyDisplayedServiceAtom,
  useVtTranslate,
  router,
  customUseAtom
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
      services.length / Number(initialOffset.slidesToSlide)
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
          services.length / Number(initialOffset.slidesToSlide)
        )
      });
    },
    // CAUTION ⚠️: Never add initialOffset in the dependency array, it will lead to an infinite loop
    [windowDimensions]
  );

  const id = useMemo(() => randomStringGenerator(4), []);

  const allServiceCards = useMemo(
    () =>
      services
        .filter((el) => el.fields)
        .map((el) => (
          <ServiceCard
            service={el}
            key={Math.random().toString()}
            className=""
            defaultImage={defaultServiceImage}
            currentModalAtom={currentModalAtom}
            currentlyDisplayedServiceAtom={currentlyDisplayedServiceAtom}
            router={router}
            useVtTranslate={useVtTranslate}
            customUseAtom={customUseAtom}
          />
        )),
    [services]
  );

  return (
    <React.Fragment>
      <div
        className={`relative ${notWrapped ? "" : "site-wrapper"} ${className} `}
      >
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
          dotListClass={`news-carousel-dots-${id}`}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          additionalTransfrom={state.additionalTransform}
          beforeChange={(nextSlide, carouselState) => {
            const allDots = document.querySelectorAll(
              `.news-carousel-dots-${id} > .react-multi-carousel-dot`
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
          {allServiceCards}
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

interface LocationServicesCarouselProps {
  services: CfCollectionService[];
  defaultServiceImage: Asset;
  dotsClassName?: string;
  notWrapped?: boolean;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentlyDisplayedServiceAtom: ReturnType<
    VTAtom<CfCollectionService["fields"] | null>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  router: any;
  customUseAtom: typeof useAtom;
}

export default LocationServicesCarousel;
