/* eslint-disable no-use-before-define,react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import {
  ComponentProps,
  CfCollectionEmployee,
  UseVtTranslateType
} from "../../../@types";
import { useWindowDimension } from "../../hocs";
import TeamMemberCard from "./TeamMemberCard";
import { CarouselDots } from "../../carouselDots";
import {
  customLeftArrow,
  customRightArrow,
  getCarouselExtraTransformPixels,
  randomStringGenerator
} from "../../../shared/utils";

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

const TeamMembersCarousel: React.FC<
  ComponentProps<TeamMembersCarouselProps>
> = ({
  members = [],
  className,
  onButtonClick,
  dotsClassName,
  router,
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
    totalSlides: Math.ceil(members.length / Number(initialOffset.slidesToSlide))
  });

  const RightArrow = customRightArrow();
  const LeftArrow = customLeftArrow();

  const carouselInstanceId = useMemo(() => randomStringGenerator(4), []);

  useEffect(
    () => {
      setState({
        ...state,
        additionalTransform: initialOffset.transform - initialOffset.offset,
        totalSlides: Math.ceil(
          members.length / Number(initialOffset.slidesToSlide)
        )
      });
    },
    // CAUTION ⚠️: Never add initialOffset in the dependency array, it will lead to an infinite loop
    [windowDimensions]
  );

  const teamMembersNodes = useMemo(
    () =>
      members
        .filter((el) => el.fields)
        .map((employee) => (
          <TeamMemberCard
            member={employee}
            onButtonClick={onButtonClick}
            key={Math.random().toString()}
            router={router}
            useVtTranslate={useVtTranslate}
          />
        )),
    [members]
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
          customRightArrow={<RightArrow />}
          customLeftArrow={<LeftArrow />}
          keyBoardControl
          dotListClass={`team-members-carousel-dots-${carouselInstanceId}`}
          rewind
          additionalTransfrom={state.additionalTransform}
          beforeChange={(nextSlide, carouselState) => {
            const allDots = document.querySelectorAll(
              `.team-members-carousel-dots-${carouselInstanceId} > .react-multi-carousel-dot`
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
          {teamMembersNodes}
        </Carousel>
      </div>
      {members.length > 1 && (
        <CarouselDots
          activeDotColor="#D52F89"
          centerDots={3}
          currentSlide={state.currentSlide}
          dotColor="rgba(0, 0, 0, 0)"
          totalSlides={state.totalSlides}
          className={`mt-[40px] ${dotsClassName}`}
        />
      )}
    </React.Fragment>
  );
};

interface TeamMembersCarouselProps {
  members: CfCollectionEmployee[];
  onButtonClick: (member: CfCollectionEmployee) => void;
  dotsClassName?: string;
  useVtTranslate: UseVtTranslateType;
  router: any;
}

export default TeamMembersCarousel;
