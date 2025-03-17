/* eslint-disable no-use-before-define,indent,camelcase */
import React from "react";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { useAtom } from "jotai";
import {
  ComponentProps,
  VTAtom,
  CFCollectionLocation,
  LocationFields,
  ModalsOptions,
  ModalsState,
  LocationsPlacedData,
  UseVtTranslateType
} from "../../../@types";
import Section from "../../shared/Section";
import { DotIcon, Mail, MapPin, PhoneCall } from "../../../assets/icons";
import OpeningHours from "../OpeningHours";
import Button from "../../shared/Button";
import getGooglePlaceInfoOnMapsUrl from "../../../shared/utils/gmaps/getGooglePlaceInfoOnMapsUrl";
import VetTrustMap from "../../VtMap/VetTrustMap";

const LocationHomeContactSection: React.FC<
  ComponentProps<LocationHomeContactSectionProps>
> = ({
  location,
  googlePlacesData,
  currentModalAtom,
  useVtTranslate,
  allLocationsAtom,
  router,
  currentlyDisplayedLocationAtom,
  allLocationsGPlacesDataAtom,
  customUseAtom,
  isPracticeSearchModalDisplayedAtom,
}) => {
  const { t } = useVtTranslate("location");
  const [, setCurrentModal] = customUseAtom(currentModalAtom);

  return (
    <div className="bg-white grid lg:grid-cols-2 gap-[40px] lg:gap-[32px] default-radius p-[20px] lg:p-[40px] mt-[48px] lg:mt-[112px]">
      <div className="default-radius overflow-hidden">
        <VetTrustMap
          pinIcon="default"
          displayedPins={
            googlePlacesData?.geometry
              ? [googlePlacesData.geometry?.location as any]
              : []
          }
          withoutLocationDescriptors
          allLocationsAtom={allLocationsAtom}
          currentModalAtom={currentModalAtom}
          router={router}
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
          isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
        />
      </div>
      <Section
        title={{
          text: t("HOME_CONTACT_SECTION.TITLE"),
          level: "h2"
        }}
      >
        <div className="flex flex-row gap-[8px]">
          <span className="h-[24px] flex flex-col justify-center">
            <MapPin />
          </span>{" "}
          <div className="line-clamp-2 underline">
            {googlePlacesData?.formatted_address &&
            googlePlacesData &&
            googlePlacesData.geometry ? (
              <a
                className="underline"
                href={getGooglePlaceInfoOnMapsUrl(
                  googlePlacesData.geometry.location,
                  location.fields.googlePlaceId as string
                )}
                target="_blank"
                rel="noreferrer"
              >
                {googlePlacesData?.formatted_address}
              </a>
            ) : (
              `${googlePlacesData?.formatted_address || "..."}`
            )}
          </div>
        </div>
        {googlePlacesData?.opening_hours && (
          <div className="flex flex-row items-center flex-wrap mt-[12px]">
            <OpeningHours
              placesData={googlePlacesData}
              useVtTranslate={useVtTranslate}
            />
            {googlePlacesData?.opening_hours?.weekday_text && (
              <div className="flex flex-row">
                <span className="px-[8px] h-[24px] flex flex-col justify-center">
                  <DotIcon />
                </span>
                <button
                  type="button"
                  className="underline"
                  onClick={() => {
                    setCurrentModal({
                      type: ModalsOptions.ALL_OPENING_HOURS,
                      minWidth: "md"
                    });
                  }}
                >
                  {t("HERO_SHELL.ALL_OPENING_HOURS")}
                </button>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-row gap-[8px] items-center mt-[12px]">
          <span>
            <PhoneCall className="w-[16px] h-[16px]" />
          </span>
          <a href={`tel:${location.fields.phone}`} className="underline">
            {location.fields.phone}
          </a>
        </div>
        <div className="flex flex-row gap-[8px] items-center mt-[12px]">
          <span>
            <Mail />
          </span>{" "}
          <a href={`mailto:${location.fields.email}`} className="underline">
            {location.fields.email}
          </a>
        </div>
        {(location.fields.bookingUrl || location.fields.vestoriaId) && (
          <Button
            type="PRIMARY"
            size="lg"
            iconLeft="Calendar"
            focusRingClassName="xs:ring-offset-white"
            className="mt-[40px] w-full"
            onClick={() => {
              setCurrentModal({
                type: ModalsOptions.LOCATION_APPOINTMENT_BOOKING,
                minWidth: "md"
              });
            }}
            router={router}
          >
            {t("HOME_CONTACT_SECTION.BOOK_NOW_BUTTON")}
          </Button>
        )}
        {location.fields.email && (
          <Button
            type="TERTIARY"
            size="lg"
            iconLeft="Mail"
            focusRingClassName="xs:ring-offset-white"
            className="mt-[12px] w-full"
            onClick={() => {
              setCurrentModal({
                type: ModalsOptions.CONTACT_MODAL,
                minWidth: "md"
              });
            }}
            router={router}
          >
            {t("HOME_CONTACT_SECTION.CONTACT_BUTTON")}
          </Button>
        )}
      </Section>
    </div>
  );
};

interface LocationHomeContactSectionProps {
  location: CFCollectionLocation;
  googlePlacesData: Partial<PlaceData>;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  router: any;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  customUseAtom: typeof useAtom;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
}

export default LocationHomeContactSection;
