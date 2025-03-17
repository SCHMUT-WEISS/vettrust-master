/* eslint-disable no-underscore-dangle */
import React from "react";
import { useAtom } from "jotai";
import { FocusRing } from "react-aria";

import { PlaceData } from "@googlemaps/google-maps-services-js";
import {
  ComponentProps,
  PageList,
  VTAtom,
  CFCollectionLocation,
  LocationFields,
  LocationTypeKeys,
  PracticeSearchSteps,
  UseVtTranslateType,
  VTPlatformURLS
} from "../../@types";
import LocationNavigationSummaryCard from "../location/LocationNavigationSummaryCard";
import Paragraph from "../shared/Paragraph";
import Heading from "../shared/Heading";
import { Search } from "../../assets/icons";
import { NextRouter } from "../../@types/next";
import { Button } from "../shared";

// eslint-disable-next-line no-use-before-define
const LocationNavigation: React.FC<ComponentProps<LocationNavigationProps>> = ({
  currentlyDisplayedLocationAtom,
  navigationDisplayAtom,
  currentPracticeSearchStepAtom,
  isPracticeSearchModalDisplayedAtom,
  allLocationsLoadingAtom,
  LOCATION_NAV_LIST,
  locationGooglePlacesDataAtom,
  router,
  useVtTranslate,
  customUseAtom,
  platformUrl
}) => {
  const { t } = useVtTranslate("location");
  const [currentlyDisplayedLocation] = customUseAtom(
    currentlyDisplayedLocationAtom
  );
  const [, setNavigationDisplay] = customUseAtom(navigationDisplayAtom);
  const [, setCurrentSearchStep] = customUseAtom(currentPracticeSearchStepAtom);
  const [, setIsPracticeSearchModalDisplayed] = customUseAtom(
    isPracticeSearchModalDisplayedAtom
  );
  const [isAllLocationsLoading] = customUseAtom(allLocationsLoadingAtom);

  let disabledSubPages: string[] = [];

  let hideServices: boolean | null = false;

  if (platformUrl !== VTPlatformURLS.CLINICA_ALPINA) {
    hideServices =
      currentlyDisplayedLocation &&
      [LocationTypeKeys.PET_HOTEL, LocationTypeKeys.COIFFEUR].includes(
        currentlyDisplayedLocation?.type?.fields?.searchKey
      );
  }

  if (!currentlyDisplayedLocation?.referalsEmail) {
    disabledSubPages.push("ForVets");
  }

  if (!currentlyDisplayedLocation?.isRadiusOfBasel) {
    disabledSubPages.push("ForVets");
    disabledSubPages.push("AnimalRescueService");
  }

  if (
    currentlyDisplayedLocation &&
    currentlyDisplayedLocation.type.fields.searchKey ===
      LocationTypeKeys.CLINIC_PLUS
  ) {
    disabledSubPages.push("Services");
  } else {
    disabledSubPages.push("Departments");
  }

  if (
    currentlyDisplayedLocation &&
    !currentlyDisplayedLocation.servicesProvided
  ) {
    disabledSubPages.push("Services");
  }

  if (hideServices) {
    disabledSubPages.push("Services");
  }

  if (currentlyDisplayedLocation && !currentlyDisplayedLocation.partners) {
    disabledSubPages.push("OurPartners");
  }

  const navigationList = LOCATION_NAV_LIST(t).filter(
    (el) => !disabledSubPages.includes(el.key)
  );

  const currentPageIndex = navigationList.findIndex(
    (location) => location.pathname === router.pathname
  );

  const _getHomePageStyle = (index: number) => {
    const borderTop =
      index === currentPageIndex ? "border-t-0" : "border-t-[1px]";
    return index === 0 ? `${borderTop} border-solid border-t-sand-pressed` : "";
  };

  const _getActivePageStyle = (index: number) =>
    index === currentPageIndex
      ? "bg-magenta/10 border-l-magenta border-l-[3px] rounded-r-[12px] [padding-left:17px_!important] lg:[padding-left:45px_!important]"
      : "";

  const _getDisabledPageStyle = (location: { disabled: boolean }) =>
    location.disabled ? "cursor-not-allowed" : "";

  const _getPreviousPageBorderStyle = (index: number) =>
    index === currentPageIndex - 1
      ? ""
      : "border-b-[1px] border-solid border-b-sand-pressed";

  const _getCurrentPageNavStyle = (
    index: number,
    page: { disabled: boolean }
  ) => `${_getActivePageStyle(index)} ${_getDisabledPageStyle(page)}`;

  const _getBorders = (index: number) =>
    `${_getHomePageStyle(index)} ${_getPreviousPageBorderStyle(index)}`;

  disabledSubPages = Array.from(new Set(disabledSubPages));

  return (
    <React.Fragment>
      <div className="px-[20px] lg:px-[48px] min-h-[64px]">
        <div className="flex flex-row justify-between mb-[12px]">
          <Heading
            text={t("NAVIGATION.YOUR_LOCATION")}
            level="h3"
            className="hidden lg:block"
          />
          <Heading
            text={t("NAVIGATION.YOUR_LOCATION")}
            level="h4"
            className="lg:hidden"
          />
          {platformUrl !== VTPlatformURLS.CLINICA_ALPINA && (
            <Paragraph
              type="body_2"
              className="flex flex-row items-center font-NotoSans font-semibold text-darkBlue cursor-pointer"
              onClick={() => {
                if (!isAllLocationsLoading) {
                  setNavigationDisplay(false);
                  setCurrentSearchStep(
                    PracticeSearchSteps.LOCATION_NAME_FILTER
                  );
                  setIsPracticeSearchModalDisplayed(true);
                }
              }}
            >
              <Search className="mr-[8px]" />
              {t("NAVIGATION.SEARCH_LOCATION")}
            </Paragraph>
          )}
        </div>
        <LocationNavigationSummaryCard
          location={currentlyDisplayedLocation as LocationFields}
          locationGooglePlacesDataAtom={locationGooglePlacesDataAtom}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      </div>
      <div className="pt-[16px] pr-[20px] lg:pr-[48px]">
        {navigationList.map((location, index) => (
          <FocusRing
            focusRingClass="ring ring-opacity-50 ring-magenta ring-[2px] rounded-r-[2px] navigation-ring-no-border"
            key={location.key}
          >
            <Button
              type="NONE"
              size="lg"
              className={`block w-full hover:text-magenta cursor-pointer outline-none pl-[20px] lg:pl-[48px] text-darkBlue box-border text-left ${_getCurrentPageNavStyle(index, location)} show-children-on-hover ${location.key === "OurPartners" ? "gtm-partner-link" : ""}`}
              disabled={location.disabled}
              url={location.pathname.replace("[location_slug]", currentlyDisplayedLocation?.slug || "oops")}
              router={router}
              onClick={() => setNavigationDisplay(false)}
            >
              <Paragraph
                type="body_2"
                className={`font-NotoSans ${_getBorders(index)} pt-[16px] pb-[16px] flex flex-col justify-center gap-[4px] font-semibold `}
                style={{ borderBottom: index === currentPageIndex ? "none" : undefined }}
              >
                {location.title}
              </Paragraph>
            </Button>
          </FocusRing>
        ))}
      </div>
    </React.Fragment>
  );
};

export interface LocationNavigationProps {
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<CFCollectionLocation["fields"] | null>["vTAtom"]
  >;
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  currentPracticeSearchStepAtom: ReturnType<
    VTAtom<PracticeSearchSteps | null>["vTAtom"]
  >;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  LOCATION_NAV_LIST: PageList;
  navigationDisplayAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  locationGooglePlacesDataAtom: ReturnType<
    VTAtom<Partial<PlaceData> | null>["vTAtom"]
  >;
  router: NextRouter;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
  platformUrl?: VTPlatformURLS;
}

export default LocationNavigation;
