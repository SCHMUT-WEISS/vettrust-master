/* eslint-disable no-use-before-define */
import React from "react";
import { Theme } from "@mui/material/styles";
import { useAtom } from "jotai";
import VetTrustMap from "../../VtMap/VetTrustMap";
import {
  CFCollectionLocation,
  LocationFields,
  ComponentProps,
  VTAtom,
  ModalsState,
  LocationsPlacedData,
  UseVtTranslateType
} from "../../../@types";
import VetTrustMapMobile from "../../VtMap/VetTrustMapMobile";
import Heading from "../../shared/Heading";
import { NextRouter } from "../../../@types/next";

const LocationSearchResultsMap: React.FC<
  ComponentProps<LocationSearchResultsMapProps>
> = ({
  locationsToDisplay,
  isLoading,
  useVtTranslate,
  allLocationsAtom,
  allLocationsGPlacesDataAtom,
  currentModalAtom,
  currentlyDisplayedLocationAtom,
  router,
  muiTheme,
  customUseAtom,
  isPracticeSearchModalDisplayedAtom,
}) => {
  const { t } = useVtTranslate("location");
  const pins = locationsToDisplay.map(
    (loc) =>
      ({
        lat: loc.fields.address.lat,
        lng: loc.fields.address.lon,
        locationId: loc.sys.id
      } as any)
  );

  return (
    <React.Fragment>
      <VetTrustMapMobile
        displayedPins={pins}
        pinIcon="all-locations"
        className="lg:hidden"
        title={
          <React.Fragment>
            <div className="text-lightBlue-1.5">{t("SEARCH_PAGE.TITLE")}</div>
            <Heading
              level="h3"
              text={t("SEARCH_PAGE.MAP_MOBILE_RESULTS_NUMBER_LABEL", {
                locationsToDisplayLength: pins.length
              })}
            />
          </React.Fragment>
        }
        allLocationsAtom={allLocationsAtom}
        allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
        currentModalAtom={currentModalAtom}
        currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
        router={router}
        muiTheme={muiTheme}
        useVtTranslate={useVtTranslate}
        customUseAtom={customUseAtom}
        isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
      />
      <div className="h-[136px] md:h-[412px] lg:h-[688px] default-radius overflow-hidden hidden lg:block">
        <VetTrustMap
          displayedPins={pins}
          isLoading={isLoading}
          pinIcon="all-locations"
          allLocationsAtom={allLocationsAtom}
          allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
          currentModalAtom={currentModalAtom}
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          router={router}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
          isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
        />
      </div>
    </React.Fragment>
  );
};

interface LocationSearchResultsMapProps {
  locationsToDisplay: CFCollectionLocation[];
  isLoading: boolean;
  useVtTranslate: UseVtTranslateType;
  router: NextRouter;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  muiTheme: Theme;
  customUseAtom: typeof useAtom;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
}

export default LocationSearchResultsMap;
