/* eslint-disable no-use-before-define */

import React, { useLayoutEffect } from "react";
import { ComponentProps } from "../../../@types";
import { BgCircleCanvas } from "../../../assets/svg";
import VTImage from "../../shared/VTImage";
import { useWindowDimension } from "../../hocs/useWindowDimensions";
import { DEFAULT_IMAGE_LOADER } from "../../../shared/pages";

const LocationDepartmentDescription: React.FC<
  ComponentProps<LocationDepartmentDescriptionProps>
> = ({
  children,
  image,
  className,
  showBgImageToTheRight,
  reversed,
  scrollAnchorId,
  hideBgImage
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = React.useState("");
  const windowDimensions = useWindowDimension();

  useLayoutEffect(() => {
    if (parentRef.current) {
      setImageHeight(`${parentRef.current.offsetHeight}px`);
    }
  }, [windowDimensions]);

  const isMd = windowDimensions.width < 1024;

  return (
    <div className={`container-wrapper relative z-[11] ${className}`}>
      <div className="absolute top-[-90px]" id={scrollAnchorId}>
        &nbsp;
      </div>
      {!hideBgImage && (
        <BgCircleCanvas
          className={`absolute ${
            showBgImageToTheRight ? "right-[-400px]" : "left-[-400px]"
          } top-[calc(50%_-_400px)] z-[-1]`}
        />
      )}
      <div
        className={`flex flex-col lg:items-center ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-[40px] lg:gap-[64px]`}
      >
        <div
          className={`relative w-full lf:w-[49%] min-h-[273px] h-[273px] lg:h-[580px] flex-grow ${image.className}`}
          style={{
            height: isMd ? 273 : imageHeight
          }}
        >
          <VTImage
            className="rounded-[12px] object-cover"
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
        <div
          className="flex-wrap w-full lf:w-[calc(51%_-_64px)] "
          ref={parentRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

interface LocationDepartmentDescriptionProps {
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
  scrollAnchorId?: string;
  hideBgImage?: boolean;
}

export default LocationDepartmentDescription;
