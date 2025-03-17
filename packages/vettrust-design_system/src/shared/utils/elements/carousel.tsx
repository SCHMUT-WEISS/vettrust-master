/* eslint-disable sonarjs/no-identical-functions,react-hooks/exhaustive-deps,indent */
import React, { useEffect } from "react";
import { ResponsiveType } from "react-multi-carousel";
import {
  ActiveCarouselDot,
  ChevronLeft,
  ChevronRight,
  InactiveCarouselDot,
  InactiveCarouselDotSmall
} from "../../../assets/icons";
import Button from "../../../components/shared/Button";

export const getDotElement = (
  currentSlide: number,
  index: number,
  carouselItemsLength: number
) => {
  const distance = Math.abs(currentSlide - index);
  if (distance === 0) {
    return <ActiveCarouselDot key={Math.random().toString()} />;
  }

  if (index === carouselItemsLength - 1) {
    return (
      <InactiveCarouselDotSmall
        key={Math.random().toString()}
        className="mb-[3px]"
      />
    );
  }

  return <InactiveCarouselDot key={Math.random().toString()} />;
};

export const customRightArrow =
  (customOnclick?: (props?: any) => void) =>
  ({ onClick, ...rest }: any) => {
    const { disabled } = rest;

    useEffect(() => {
      if (customOnclick) {
        customOnclick(rest);
      }
      // CAUTION ⚠️: Never add rest in the dependency array, it will lead to an infinite loop
    }, [disabled]);

    return (
      <Button
        type="PRIMARY"
        size="sm"
        onClick={() => {
          onClick();
        }}
        className={`absolute right-[88px] p-0 rounded-full w-[32px] h-[32px] hidden lg:flex ${
          disabled ? "bg-darkBlue/25 hover:bg-darkBlue/25" : ""
        }`}
        disabled={disabled}
        router={rest.router}
      >
        <ChevronRight className="bg-transparent" />
      </Button>
    );
  };

export const customLeftArrow =
  (customOnclick?: (props?: any) => void) =>
  ({ onClick, ...rest }: any) => {
    const { disabled } = rest;

    useEffect(() => {
      if (customOnclick) {
        customOnclick(rest);
      }
      // CAUTION ⚠️: Never add rest in the dependency array, it will lead to an infinite loop
    }, [disabled]);

    return (
      <Button
        type="PRIMARY"
        size="sm"
        onClick={() => {
          onClick();
        }}
        className={`absolute left-[88px] p-0 rounded-full w-[32px] h-[32px] hidden lg:flex  ${
          disabled ? "bg-darkBlue/25 hover:bg-darkBlue/25" : ""
        }`}
        disabled={disabled}
        router={rest.router}
      >
        <ChevronLeft className="bg-transparent" />
      </Button>
    );
  };

export const getCarouselExtraTransformPixels = (
  windowDimensions: {
    width: number;
    height: number;
  },
  responsiveObject?: ResponsiveType
) => {
  const screens = {
    xs: 375,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  };

  let offsetProps = {
    transform: 144,
    offset: 32,
    slidesToSlide: responsiveObject?.desktop.slidesToSlide
  };

  const isXs = windowDimensions.width < screens.xs;
  const isSm =
    windowDimensions.width >= screens.xs && windowDimensions.width < screens.sm;
  const isMd =
    windowDimensions.width >= screens.sm && windowDimensions.width < screens.md;
  const isLg =
    windowDimensions.width >= screens.md && windowDimensions.width < screens.lg;
  const isXl =
    windowDimensions.width >= screens.lg && windowDimensions.width < screens.xl;

  if (isXs) {
    offsetProps = {
      transform: 20,
      offset: 20,
      slidesToSlide: responsiveObject?.desktop.slidesToSlide
    };
  }

  if (isSm) {
    offsetProps = {
      transform: 20,
      offset: 20,
      slidesToSlide: responsiveObject?.mobile.slidesToSlide
    };
  }

  if (isMd) {
    offsetProps = {
      transform: 20,
      offset: 20,
      slidesToSlide: responsiveObject?.tablet.slidesToSlide
    };
  }

  if (isLg) {
    offsetProps = {
      transform: 72,
      offset: 24,
      slidesToSlide: responsiveObject?.tablet.slidesToSlide
    };
  }
  if (isXl) {
    offsetProps = {
      transform: 144,
      offset: 32,
      slidesToSlide: responsiveObject?.desktop.slidesToSlide
    };
  }
  return offsetProps;
};
