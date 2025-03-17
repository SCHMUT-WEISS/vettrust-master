/* eslint-disable no-use-before-define */
import React, { useLayoutEffect } from "react";
import {
  ComponentProps,
  UseVtTranslateType,
  LocationFields,
  VTPlatformURLS
} from "../../@types";
import VTImage from "../shared/VTImage";
import { formatURL } from "../../shared/utils";
import Heading from "../shared/Heading";
import { useWindowDimension } from "../hocs";
import Button from "../shared/Button";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";

const RelatedLocationSummaryCard: React.FC<
  ComponentProps<LocationNavigationSummaryCardProps>
> = ({ location, useVtTranslate, router, platformUrl }) => {
  const { t } = useVtTranslate("location");
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = React.useState("");
  const windowDimensions = useWindowDimension();

  const shouldRedirectToExternalWebsite = Boolean(location.hasExternalWebsite && platformUrl === VTPlatformURLS.VETTRUST);

  useLayoutEffect(() => {
    if (parentRef.current) {
      setImageHeight(`calc(${parentRef.current.offsetHeight}px - 16px)`);
    }
  }, [windowDimensions]);

  return (
    <div
      className="bg-white default-radius flex flex-row gap-[12px] lg:gap-[16px] pl-[8px] pr-[12px] lg:pr-[16px] lg:min-h-[92px] z-[11]"
      ref={parentRef}
    >
      <div className="flex flex-col justify-center">
        <div
          className="w-[94px] lg:w-[98px] border-magenta overflow-hidden rounded-[6px] object-cover relative"
          style={{
            height: imageHeight
          }}
        >
          <VTImage
            src={formatURL(location?.heroImages[0]?.fields?.file?.url)}
            layout="fill"
            className="border-solid border-[5px]"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={
              formatURL(location?.heroImages[0]?.fields?.file?.url) ||
              DEFAULT_IMAGE_LOADER
            }
            alt={location?.heroImages[0]?.fields?.description}
          />
        </div>
      </div>
      <div className="py-[12px] lg:py-[16px] flex flex-col">
        <Heading text={location.name} className="line-clamp-2 flex-grow" level="h4" />
        <Button
          type="TERTIARY"
          size="sm"
          className={`border-0 p-0 text-[16px] justify-start mt-[8px] h-[24px] ${
            shouldRedirectToExternalWebsite && "cursor-alias"
          }`}
          disabled={false}
          iconRight={
            shouldRedirectToExternalWebsite
              ? "ExternalLinkDanger"
              : "ArrowRightDanger"
          }
          url={
            shouldRedirectToExternalWebsite
              ? location.externalWebsiteUrl
              : `/locations/${location.slug}`
          }
          focusRingClassName="xs:ring-offset-white"
          target={shouldRedirectToExternalWebsite ? "_blank" : "_self"}
          router={router}
        >
          {t("RELATED_LOCATIONS.CHECKOUT_BUTTON")}
        </Button>
      </div>
    </div>
  );
};

interface LocationNavigationSummaryCardProps {
  location: LocationFields;
  router: any;
  useVtTranslate: UseVtTranslateType;
  platformUrl?: VTPlatformURLS;
}

export default RelatedLocationSummaryCard;
