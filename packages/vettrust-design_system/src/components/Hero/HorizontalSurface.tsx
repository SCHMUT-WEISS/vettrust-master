/* eslint-disable no-use-before-define */
/*
 * This component behaves the same as the Surface component however it is just for the hero section
 * */
import React from "react";
import { ComponentProps } from "../../@types";
import VTImage from "../shared/VTImage";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const HorizontalSurface: React.FC<ComponentProps<HorizontalSurfaceProps>> = ({
  children,
  image
}) => (
  <div className="relative w-full h-full">
    <div className="absolute w-[calc(100vw_-_20px)] md:w-[calc(100vw_-_48px)] lg:w-[76.3%] h-[408px] lg:h-full">
      <VTImage
        className="rounded-[12px] object-cover w-full h-auto"
        layout="fill"
        src={image.url}
        alt={image.alt}
        style={{
          filter: "drop-shadow(0px 2px 24px rgba(0, 0, 0, 0.04))"
        }}
        objectFit="cover"
        placeholder="blur"
        blurDataURL={image?.blurDataUrl || DEFAULT_IMAGE_LOADER}
      />
    </div>
    <div className="absolute top-[256px] lg:top-[unset] right-[20px] lg:right-0 w-[calc(100%_-_40px)] lg:w-[560px] h-[320px] lg:h-full flex flex-col justify-center">
      {children}
    </div>
  </div>
);

interface HorizontalSurfaceProps {
  image: {
    url: string;
    blurDataUrl: string;
    smallUrl?: string;
    alt?: string;
    className?: string;
  };
}

export default HorizontalSurface;
