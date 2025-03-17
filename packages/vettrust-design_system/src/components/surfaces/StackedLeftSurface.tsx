/* eslint-disable no-use-before-define */
import React from "react";
import { ComponentProps } from "../../@types";
import VTImage from "../shared/VTImage";
import useRefSize from "../hocs/useRefSize";
import { useWindowDimension } from "../hocs/useWindowDimensions";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const StackedLeftSurface: React.FC<ComponentProps<StackedLeftSurfaceProps>> = ({
  children,
  image,
  className
}) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  const sectionSize = useRefSize(sectionRef);
  const windowSize = useWindowDimension();

  return (
    <div className={`content-wrapper z-[11] ${className}`}>
      <div
        className="relative h-[746px] lg:h-[608px]"
        style={{
          height:
            sectionSize && !(windowSize.width > 1023)
              ? sectionSize.height + 280
              : undefined
        }}
      >
        <div
          className="absolute top-[280px] lg:top-0 left-[10px] md:left-[24px] lg:left-0 w-[calc(100%_-_20px)] md:w-[calc(100%_-_48px)] lg:w-[659px] flex flex-col justify-start lg:justify-center lg:h-full lg:ml-[96px] z-[10] "
          ref={sectionRef}
        >
          {children}
        </div>
        <div className="absolute w-[calc(100vw_-_20px)] md:w-[calc(100vw_-_48px)] lg:w-[63.5%] h-[384px] lg:h-full right-0">
          <VTImage
            className="rounded-[12px] object-cover w-full h-auto"
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
      </div>
    </div>
  );
};

interface StackedLeftSurfaceProps {
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

export default StackedLeftSurface;
