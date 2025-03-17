/* eslint-disable no-use-before-define */
import React from "react";

import { Theme } from "@mui/material/styles";
import { useAtom } from "jotai";
import VetTrustMap from "../VtMap/VetTrustMap";
import {
  VtMapPinCoordinates,
  ComponentProps,
  VTAtom,
  CFCollectionLocation,
  LocationFields,
  ModalsState,
  LocationsPlacedData,
  UseVtTranslateType
} from "../../@types";
import VetTrustMapMobile from "../VtMap/VetTrustMapMobile";
import Heading from "../shared/Heading";
import { NextRouter } from "../../@types/next";

const PracticeSearchMap: React.FC<ComponentProps<PracticeSearchMapProps>> = ({
  isLoading,
  displayedPins,
  router,
  allLocationsGPlacesDataAtom,
  allLocationsAtom,
  currentModalAtom,
  currentlyDisplayedLocationAtom,
  muiTheme,
  useVtTranslate,
  customUseAtom,
  isPracticeSearchModalDisplayedAtom
}) => {
  const { t } = useVtTranslate("location");

  return (
    <React.Fragment>
      <VetTrustMapMobile
        displayedPins={displayedPins}
        pinIcon="default"
        isLoading={isLoading}
        title={
          <React.Fragment>
            <div className="text-lightBlue-1.5">
              {t("ALL_LOCATIONS.OUR_LOCATIONS")}
            </div>
            <Heading
              level="h3"
              text={t("ALL_LOCATIONS.LOCATIONS_COUNT", {
                count: displayedPins.length
              })}
            />
          </React.Fragment>
        }
        className="xs:h-[280px] mt-[16px] lg:hidden"
        disabled={displayedPins.length === 0}
        allLocationsAtom={allLocationsAtom}
        router={router}
        currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
        currentModalAtom={currentModalAtom}
        allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
        muiTheme={muiTheme}
        useVtTranslate={useVtTranslate}
        customUseAtom={customUseAtom}
        isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
      />

      <div className="h-[280px] mt-[16px] rounded-[8px] overflow-hidden hidden lg:block">
        <VetTrustMap
          isLoading={isLoading}
          pinIcon="default"
          displayedPins={displayedPins}
          allLocationsAtom={allLocationsAtom}
          router={router}
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          currentModalAtom={currentModalAtom}
          allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
          isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
        />
      </div>
    </React.Fragment>
  );
};

interface PracticeSearchMapProps {
  isLoading: boolean;
  displayedPins: VtMapPinCoordinates[];
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  router: NextRouter;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  muiTheme: Theme;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
}

export default PracticeSearchMap;
