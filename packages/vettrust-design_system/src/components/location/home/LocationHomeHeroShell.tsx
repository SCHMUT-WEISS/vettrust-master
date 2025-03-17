/* eslint-disable */
import React from "react";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { useAtom } from "jotai";
import { ComponentProps, UseVtTranslateType, VTAtom } from "../../../@types";
import { CFCollectionLocation } from "../../../@types";
import Section from "../../shared/Section";
import { Mail, MapPin, PhoneCall, Users } from "../../../assets/icons";
import Button from "../../shared/Button";
import { CatFriendlyLocationSign } from "../../../assets/svg";
import OpeningHours from "../OpeningHours";
import { ModalsOptions, ModalsState } from "../../../@types";
import getGooglePlaceInfoOnMapsUrl from "../../../shared/utils/gmaps/getGooglePlaceInfoOnMapsUrl";
import AnnouncementItem from "./AnnouncementItem";
import { CFCollectionAnnouncement } from "../../../@types";
import { LocationTypeKeys } from "../../../@types";

const DotIcon = () => (
  <svg
    width="4"
    height="4"
    viewBox="0 0 4 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="2" cy="2" r="2" fill="#132F55" />
  </svg>
);

const LocationHomeHeroShell: React.FC<
  ComponentProps<LocationHomeHeroShellProps>
> = ({
  location,
  hasSimilarLocations,
  googlePlacesData,
  announcements,
  useVtTranslate,
  currentModalAtom,
  currentlyDisplayedAnnouncementAtom,
  router,
  customUseAtom
}) => {
  const { t } = useVtTranslate("location");
  const [, setCurrentModal] = customUseAtom(currentModalAtom);

  return (
    <div
      className={`flex flex-row justify-center h-fit container-wrapper w-full ${
        hasSimilarLocations
          ? "hero__shell-with-related-location-animated mb-[-311px] lg:mb-[-64px]"
          : "hero__shell-animated mb-[-406px] lg:mb-[-64px]"
      }`}
    >
      <div className="bg-white default-radius p-[20px] lg:p-[40px] w-full relative">
        {location.fields.isCatFriendly && (
          // @ts-ignore
          <CatFriendlyLocationSign className="absolute top-[-50px] left-[-7px] lg:left-[13px]" />
        )}
        <Section title={{ text: location.fields.name, level: "h2" }}>
          <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[32px]">
            <div className="lg:w-[calc(50%_-_32px)]">
              <div className="flex flex-row gap-[8px]">
                <span className="h-[24px] flex flex-col justify-center">
                  <MapPin />
                </span>{" "}
                <div className="line-clamp-2">
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
            </div>
            <div className="flex-auto lg:pl-[32px] lg:border-l-[1px] lg:border-sand-pressed">
              <div className="flex flex-row gap-[8px]">
                <span className="h-[24px] flex flex-col justify-center">
                  <PhoneCall className="w-[16px] h-[16px]" />
                </span>
                <a href={`tel:${location.fields.phone}`} className="underline">
                  {location.fields.phone}
                </a>
              </div>

              {location.fields.email !== undefined && (
                <div className="flex flex-row gap-[8px] mt-[12px]">
                  <span className="h-[24px] flex flex-col justify-center">
                    <Mail />
                  </span>{" "}
                  <a
                    href={`mailto:${location.fields.email}`}
                    className="underline"
                  >
                    {location.fields.email}
                  </a>
                </div>
              )}
            </div>
            {location.fields?.languages?.length > 0 && (
              <div className="flex-auto lg:pl-[32px] lg:border-l-[1px] lg:border-sand-pressed">
                <div className="flex flex-row gap-[8px]">
                  <span className="h-[24px] flex flex-col justify-center">
                    <Users className="w-[16px] h-[16px]" />
                  </span>
                  <span className="text-darkBlue">
                    {location.fields.languages.join(", ")}
                  </span>
                </div>
              </div>
            )}
          </div>

          {announcements.length !== 0 && (
            <div className="mt-[24px] bg-[#D52F890D] default-radius py-[10px] px-[12px] border border-magenta">
              {announcements.slice(0, 3).map((announcement, index) => (
                <AnnouncementItem
                  key={Math.random().toString() + announcement.sys.id}
                  announcement={announcement}
                  className={`${index !== 0 ? "mt-[8px]" : ""}`}
                  currentModalAtom={currentModalAtom}
                  currentlyDisplayedAnnouncementAtom={
                    currentlyDisplayedAnnouncementAtom
                  }
                  useVtTranslate={useVtTranslate}
                  customUseAtom={customUseAtom}
                />
              ))}
            </div>
          )}
          <div className="flex flex-col flex-wrap lg:flex-row gap-[16px] mt-[40px]">
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
              {t("HERO_SHELL.BUTTON_1")}
            </Button>
            <Button
              type="PRIMARY"
              size="lg"
              iconRight="ArrowRight"
              focusRingClassName="xs:ring-offset-white"
              url={`/locations/${location.fields.slug}/contact`}
              router={router}
            >
              {t("HERO_SHELL.BUTTON_2")}
            </Button>

            {![LocationTypeKeys.PET_HOTEL, LocationTypeKeys.COIFFEUR].includes(
              location.fields.type.fields.searchKey
            ) && (
              <Button
                type="TERTIARY"
                size="lg"
                iconRight="ArrowRight"
                focusRingClassName="xs:ring-offset-white"
                url={`/locations/${location.fields.slug}/services`}
                router={router}
              >
                {t("HERO_SHELL.BUTTON_3")}
              </Button>
            )}

            {location.fields.offersReferals && (
              <Button
                type="TERTIARY"
                size="lg"
                focusRingClassName="xs:ring-offset-white"
                router={router}
                onClick={() =>
                  setCurrentModal({
                    type: ModalsOptions.REFERRAL_FORM,
                    minWidth: "lg"
                  })
                }
              >
                {t("HERO_SHELL.BUTTON_4")}
              </Button>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
};

interface LocationHomeHeroShellProps {
  className?: string;
  location: CFCollectionLocation;
  hasSimilarLocations: boolean;
  googlePlacesData: Partial<PlaceData>;
  announcements: CFCollectionAnnouncement[];
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  currentlyDisplayedAnnouncementAtom: ReturnType<
    VTAtom<CFCollectionAnnouncement | null>["vTAtom"]
  >;
  router: any;
  customUseAtom: typeof useAtom;
}

export default LocationHomeHeroShell;
