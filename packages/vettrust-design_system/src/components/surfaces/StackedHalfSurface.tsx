/* eslint-disable no-use-before-define */
import React from "react";
import { ComponentProps } from "../../@types";
import VTImage from "../shared/VTImage";
import { BgCircleCanvas as BgCircleCanvasLeft } from "../../assets/svg";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const StackedHalfSurface: React.FC<ComponentProps<StackedHalfSurfaceProps>> = ({
  children,
  image,
  className,
  showBgImageToTheRight,
  reversed,
  contentNotWrapped
}) => {
  return (
    <div
      className={`${
        contentNotWrapped ? "" : "container-wrapper"
      } relative z-[11] ${className}`}
    >
      <BgCircleCanvasLeft
        className={`absolute ${
          showBgImageToTheRight ? "right-[-400px]" : "left-[-400px]"
        } top-[calc(50%_-_400px)] z-[-1]`}
      />
      <div
        className={`flex flex-col ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-[40px] lg:gap-[64px]`}
      >
        <div
          className={`relative w-full lf:w-[49%] min-h-[16rem] flex-grow ${image.className}`}
        >
          <VTImage
            className="rounded-[12px] object-cover default-radius"
            layout="fill"
            src={image.src}
            alt={image.alt}
            style={{
              filter: "drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.04))"
            }}
            objectFit="cover"
            placeholder="blur"
            blurDataURL={image?.blurDataUrl || DEFAULT_IMAGE_LOADER}
          />
        </div>
        <div className="flex-wrap w-full lf:w-[calc(51%_-_64px)] py-8">
          {children}
        </div>
      </div>
    </div>
  );
};

interface StackedHalfSurfaceProps {
  image: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    blurDataUrl: string;
  };
  showBgImageToTheRight?: boolean;
  reversed?: boolean;
  contentNotWrapped?: boolean;
}

export default StackedHalfSurface;
