/**
 * The Surface component is a basic container that provides a structure
 * for components that should be for e.g. stacked on top of each other,
 * or next to each other in a way that is repeated throughout the app.
 * One good example is the "Practice Owner" part of the About Us page.
 * Check the StackRightSurface and StackedLeftRight components as well.
 */

/* eslint-disable no-use-before-define,indent,sonarjs/cognitive-complexity,security/detect-object-injection */
import React from "react";
import { ComponentProps } from "../../@types";
import VTImage from "../shared/VTImage";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

// eslint-disable-next-line no-use-before-define
const Surface: React.FC<ComponentProps<SurfaceProps>> = ({
  className,
  sectionClassName,
  image,
  children,
  type,
  showImageOverlay
}) => {
  let classes = { container: "", section: "", image: "" };

  switch (type) {
    case "TWO_THIRDS":
      classes = {
        container: "min-h-[478px] flex flex-row-reverse gap-[64px]",
        section: "w-[29%] min-h-[478px]",
        image:
          "relative w-[65%] h-[478px] border-[1px] border-solid border-[rgba(217, 206, 191, 0.4)] rounded-[12px]"
      };
      break;

    case "-TWO_THIRDS":
      classes = {
        container: "min-h-[478px] flex flex-row gap-[64px]",
        section: "w-[29%] min-h-[478px]",
        image:
          "relative w-[65%] h-[478px] border-[1px] border-solid border-[rgba(217, 206, 191, 0.4)] rounded-[12px]"
      };
      break;

    default:
      break;
  }

  return (
    <div className="content-wrapper">
      <div className={`${classes.container} ${className}`}>
        <div className={`${classes.section} ${sectionClassName}`}>
          {children}
        </div>
        <div
          className={` ${classes.image} ${image.className}`}
          style={image.style}
        >
          {!showImageOverlay && (
            <VTImage
              className="rounded-[12px]"
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
          )}
        </div>
      </div>
    </div>
  );
};

interface SurfaceProps {
  type: "TWO_THIRDS" | "-TWO_THIRDS";
  image: {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
    blurDataUrl: string;
  };
  sectionClassName?: string;
  showImageOverlay?: boolean;
}

export default Surface;
