/* eslint-disable no-use-before-define */
import React, { useLayoutEffect } from "react";
import { useAtom } from "jotai";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import {
  ComponentProps,
  VTAtom,
  LocationFields,
  UseVtTranslateType
} from "../../@types";
import VTImage from "../shared/VTImage";
import Heading from "../shared/Heading";
import { useWindowDimension } from "../hocs";
import OpeningHours from "./OpeningHours";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";
import { formatURL } from "../../shared/utils";

const LocationNavigationSummaryCard: React.FC<
  ComponentProps<LocationNavigationSummaryCardProps>
> = ({ location, locationGooglePlacesDataAtom, useVtTranslate, customUseAtom }) => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = React.useState("");
  const windowDimensions = useWindowDimension();

  const [googlePlacesData] = customUseAtom(locationGooglePlacesDataAtom);

  useLayoutEffect(() => {
    if (parentRef.current) {
      setImageHeight(`calc(${parentRef.current.offsetHeight}px - 16px)`);
    }
  }, [windowDimensions]);

  return (
    <div
      className="mt-[12px] bg-white default-radius flex flex-row gap-[12px] lg:gap-[16px] pl-[8px] pr-[12px] lg:pr-[16px] min-h-[72px] lg:min-h-[80px]"
      ref={parentRef}
    >
      <div className="flex flex-col justify-center">
        {location && (
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
        )}
      </div>
      <div className="py-[12px] lg:py-[16px]">
        <Heading text={location?.name} className="line-clamp-2" level="h5" />
        <OpeningHours
          className="hidden lg:flex mt-[4px]"
          placesData={googlePlacesData as PlaceData}
          summaryClassName="text-[14px]"
          useVtTranslate={useVtTranslate}
        />
      </div>
    </div>
  );
};

interface LocationNavigationSummaryCardProps {
  location: LocationFields;
  locationGooglePlacesDataAtom: ReturnType<
    VTAtom<Partial<PlaceData> | null>["vTAtom"]
  >;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default LocationNavigationSummaryCard;
