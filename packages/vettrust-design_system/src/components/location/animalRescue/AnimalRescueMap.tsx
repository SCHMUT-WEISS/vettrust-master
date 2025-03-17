/* eslint-disable no-use-before-define */
import React from "react";
import { ComponentProps } from "../../../@types";
import { BgCircleCanvas as BgCircleCanvasLeft } from "../../../assets/svg";

const AnimalRescueMap: React.FC<ComponentProps<AnimalRescueMapProps>> = ({
  children,
  className,
  showBgImageToTheRight,
  reversed,
  image
}) => {
  return (
    <div className={`container-wrapper relative z-[11] ${className}`}>
      <BgCircleCanvasLeft
        className={`absolute ${
          showBgImageToTheRight ? "right-[-400px]" : "left-[-400px]"
        } top-[calc(50%_-_400px)] z-[-1]`}
      />
      <div
        className={`flex flex-col lg:items-center ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-[40px] lg:gap-[64px]`}
      >
        <div
          className={`relative w-full lf:w-[49%] h-[273px] lg:h-[580px] flex-grow ${image?.className}`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-fill default-radius"
          />
        </div>
        <div className="flex-wrap w-full lf:w-[calc(51%_-_64px)] ">
          {children}
        </div>
      </div>
    </div>
  );
};

interface AnimalRescueMapProps {
  showBgImageToTheRight?: boolean;
  reversed?: boolean;
  image: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    blurDataUrl: string;
  };
}

export default AnimalRescueMap;
