/* eslint-disable no-use-before-define,indent,camelcase,react/jsx-curly-newline */
import React from "react";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { useAtom } from "jotai";
import Paragraph from "../../shared/Paragraph";
import Section from "../../shared/Section";
import {
  CFCollectionLocation,
  ComponentProps,
  VTAtom,
  ModalsOptions,
  ModalsState,
  UseVtTranslateType
} from "../../../@types";
import getGooglePlaceInfoOnMapsUrl from "../../../shared/utils/gmaps/getGooglePlaceInfoOnMapsUrl";
import OpeningHours from "../OpeningHours";
import Button from "../../shared/Button";
import { MapPin } from "../../../assets/icons";

const AnimalRescueHeroShel: React.FC<
  ComponentProps<AnimalRescueHeroShelProps>
> = ({
  location,
  googlePlacesData,
  className,
  useVtTranslate,
  currentModalAtom,
  router,
  customUseAtom,
}) => {
  const { t } = useVtTranslate("location");
  const [, setCurrentModal] = customUseAtom(currentModalAtom);

  return (
    <div
      className={`flex flex-row justify-center h-fit container-wrapper w-full ${className}`}
    >
      <div className="bg-white default-radius p-[20px] lg:p-[40px] w-full relative text-darkBlue">
        <Section
          title={{
            text: t("ANIMAL_RESCUE.HERO.TITLE"),
            level: "h2"
          }}
        >
          <Paragraph type="body_1" className="">
            {t("ANIMAL_RESCUE.HERO.DESCRIPTION")}
          </Paragraph>

          <div className="flex flex-row gap-[8px] mt-[24px]">
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
            <Paragraph
              type="body_2"
              className="flex flex-row items-center flex-wrap mt-[12px]"
            >
              <OpeningHours
                placesData={googlePlacesData}
                useVtTranslate={useVtTranslate}
              />
            </Paragraph>
          )}

          <div className="mt-[40px] lg:mt-[24px] ">
            <Button
              type="MAGENTA"
              size="lg"
              iconLeft="PhonePlus"
              focusRingClassName="xs:ring-offset-white"
              onClick={() =>
                setCurrentModal({
                  type: ModalsOptions.EMERGENCY,
                  minWidth: "md"
                })
              }
              router={router}
            >
              {t("ANIMAL_RESCUE.HERO.BUTTON_LABEL")}
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
};

interface AnimalRescueHeroShelProps {
  location: CFCollectionLocation;
  googlePlacesData: Partial<PlaceData>;
  useVtTranslate: UseVtTranslateType;
  currentModalAtom: any;
  router: any;
  customUseAtom: any;
}

export default AnimalRescueHeroShel;
