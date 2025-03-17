/* eslint-disable no-use-before-define */
import React from "react";
import { useAtom } from "jotai";
import { PlaceData } from "@googlemaps/google-maps-services-js";

import { ComponentProps, UseVtTranslateType, VTAtom } from "../../@types";
import { VtMapPinCoordinates } from "../../@types/components/maps";
import VTImage from "../shared/VTImage";
import { formatURL } from "../../shared/utils/contentful/helpers";
import Heading from "../shared/Heading";
import Button from "../shared/Button";
import { ModalsOptions, ModalsState } from "../../@types/components/modals";
import OpeningHours from "../location/OpeningHours";
import {
  CFCollectionLocation,
  LocationFields
} from "../../@types/content/CFClollectionLocation";
import { LocationsPlacedData } from "../../@types/atoms";
import { DEFAULT_IMAGE_LOADER } from "../../shared/pages";
import { NextRouter } from "../../@types/next";

const MapLocationPinDescriptor: React.FC<
  ComponentProps<MapLocationPinDescriptorProps>
> = ({
  pin,
  router,
  allLocationsAtom,
  allLocationsGPlacesDataAtom,
  currentlyDisplayedLocationAtom,
  currentModalAtom,
  useVtTranslate,
  customUseAtom,
  isPracticeSearchModalDisplayedAtom
}) => {
  const { t } = useVtTranslate("location");
  const [allLocations] = customUseAtom(allLocationsAtom);
  const [googlePlacesData] = customUseAtom(allLocationsGPlacesDataAtom);
  const [, setCurrentLocation] = customUseAtom(currentlyDisplayedLocationAtom);
  const [, setCurrentModal] = customUseAtom(currentModalAtom);
  const [, setIsPracticeSearchModalDisplayed] = customUseAtom(
    isPracticeSearchModalDisplayedAtom
  );

  const location = allLocations.find((el) => el.sys.id === pin.locationId);
  const locationGooglePlacesData = googlePlacesData
    .find((el) => el?.location?.id === pin?.locationId);

  const externalLink = location?.fields?.hasExternalWebsite
    ? location?.fields?.externalWebsiteUrl
    : null;
  const locationWithoutVestoriaIdContactUrl =
    externalLink || `/locations/${location?.fields.slug}/contact`;

  return (
    <div className="w-[375px] p-[16px]">
      <div className="h-[171px] overflow-hidden rounded-[8px] object-cover relative ">
        <VTImage
          src={formatURL(
            location?.fields?.heroImages[0]?.fields?.file?.url as string
          )}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          blurDataURL={
            formatURL(
              location?.fields?.heroImages[0]?.fields?.file?.url as string
            ) || DEFAULT_IMAGE_LOADER
          }
          alt={location?.fields?.heroImages[0]?.fields?.description}
        />
      </div>
      <div className="px-[8px] pb-[6px] mt-[20px]">
        <a href={`/locations/${location?.fields.slug}`}>
          <Heading
            text={location?.fields?.name}
            level="h4"
            className="cursor-pointer"
          />
        </a>

        <OpeningHours
          className="mt-[8px]"
          placesData={locationGooglePlacesData?.placesData as PlaceData}
          summaryClassName="text-[16px] leading-[24px] [font-weight:400]"
          useVtTranslate={useVtTranslate}
        />

        <div className="flex mt-[16px] gap-[8px]">
          {location?.fields.vestoriaId && !externalLink ? (
            <React.Fragment>
              <Button
                type="PRIMARY"
                size="sm"
                iconLeft="Calendar"
                onClick={() => {
                  setCurrentLocation(location.fields);
                  setCurrentModal({
                    type: ModalsOptions.LOCATION_APPOINTMENT_BOOKING,
                    minWidth: "lg"
                  });
                }}
                className="px-[12px]"
                router={router}
              >
                {t("HOME_CONTACT_SECTION.BOOK_NOW_BUTTON")}
              </Button>
              <Button
                type="TERTIARY"
                size="sm"
                iconLeft="Mail"
                onClick={() => {
                  setIsPracticeSearchModalDisplayed(false);
                  router.push(`/locations/${location.fields.slug}/contact`);
                }}
                className="w-full p-0"
                router={router}
              >
                {t("common:FOOTER.VETERINARIANS.CONTACT")}
              </Button>
            </React.Fragment>
          ) : (
            <Button
              type="PRIMARY"
              size="sm"
              iconLeft="Calendar"
              url={locationWithoutVestoriaIdContactUrl}
              className="shadow-none w-full"
              target={externalLink ? "_blank" : undefined}
              router={router}
            >
              {t("SEARCH_PAGE.APPOINTMENT_REQUEST_AND_CONTACT_BUTTON")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

interface MapLocationPinDescriptorProps {
  pin: VtMapPinCoordinates;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  router: NextRouter;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default MapLocationPinDescriptor;
