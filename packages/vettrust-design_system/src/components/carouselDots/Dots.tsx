/* eslint-disable no-use-before-define */
import React, { useRef } from "react";
import Dot from "./Dot";
import { ComponentProps } from "../../@types";

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(min, value), max);
}

const Dots: React.FC<ComponentProps<DotsProps>> = ({
  activeDotColor,
  centerDots,
  currentSlide,
  dotColor,
  totalSlides,
  className,
}) => {
  const centerOffset = useRef(0);
  const slideOffset = useRef(0);

  const currentCenterOffset = currentSlide - slideOffset.current;
  if (currentCenterOffset >= 0 && currentCenterOffset < centerDots) {
    centerOffset.current = currentCenterOffset;
  } else {
    slideOffset.current = currentSlide - centerOffset.current;
  }

  return (
    <div className={`flex flex-row justify-center items-center ${className}`}>
      {new Array(totalSlides).fill(null).map((_, idx) => {
        const centerPage =
          parseInt(`${centerDots / 2}`, 10) + slideOffset.current;
        const distance = Math.abs(idx - centerPage);

        const scaledDistance = clamp(
          distance - parseInt(`${centerDots / 2}`, 10),
          0,
          3
        );

        return (
          <Dot
            dotColor={dotColor}
            activeDotColor={activeDotColor}
            active={idx === currentSlide}
            distance={scaledDistance}
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
          />
        );
      })}
    </div>
  );
};

interface DotsProps {
  activeDotColor: string;
  centerDots: number;
  currentSlide: number;
  dotColor: string;
  totalSlides: number;
}

export default Dots;
