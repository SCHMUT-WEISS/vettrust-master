/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { useAtom } from "jotai";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React from "react";
import { Theme } from "@mui/material/styles";

import PracticesSearchDrawer from "./PracticesSearchDrawer";
import PracticeSearchOnClose from "./PracticeSearchOnClose";
import {
  ComponentProps,
  UseVtTranslateType,
  VTAtom,
  LocationsPlacedData,
  PracticeSearchFilter,
  PracticeSearchSteps,
  PracticeSearchTypes,
  CFCollectionLocation,
  LocationFields,
  ModalsState,
  VtMapPlacesResult,
  LocationSearchIndex
} from "../../@types";
import { NextRouter } from "../../@types/next";

const PracticesSearch: React.FC<ComponentProps<PracticesSearchProps>> = (props) => {
  const [isPracticeSearchModalDisplayed, setIsPracticeSearchModalDisplayed] =
    props.customUseAtom(props.isPracticeSearchModalDisplayedAtom);

  const [, setCurrentSearchStep] = props.customUseAtom(props.currentPracticeSearchStepAtom);

  const onClose = () => {
    setIsPracticeSearchModalDisplayed(false);
    setCurrentSearchStep(null);
  };

  return (
    // @ts-ignore
    <SwipeableDrawer
      anchor="top"
      open={isPracticeSearchModalDisplayed}
      onClose={onClose}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          backgroundColor: "#D9CEBFF2"
        },
        width: "100vw",
        height: "100vh"
      }}
      onOpen={() => {}}
      className="vt-drawer"
    >
      <div className="grid justify-center items-center h-screen w-screen">
        <PracticesSearchDrawer
          {...props}
        />
        <PracticeSearchOnClose
          {...props}
        />
      </div>
    </SwipeableDrawer>
  );
};

interface PracticesSearchProps {
  currentPracticeSearchStepAtom: ReturnType<
    VTAtom<PracticeSearchSteps | null>["vTAtom"]
  >;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  currentGlobalPracticeSearchFiltersAtom: ReturnType<
    VTAtom<{
      fullTextSearch: string;
      filters: string[];
    }>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  initialCantonIdAtom: ReturnType<VTAtom<string>["vTAtom"]>;
  currentPracticeSearchTypeAtom: ReturnType<
    VTAtom<PracticeSearchTypes | null>["vTAtom"]
  >;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  currentServicesFilterAtom: ReturnType<VTAtom<PracticeSearchFilter>["vTAtom"]>;
  isSearchLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  muiTheme: Theme;
  practiceSearchResultsAtom: ReturnType<
    VTAtom<CFCollectionLocation[]>["vTAtom"]
  >;
  selectedPlaceResultAtom: ReturnType<
    VTAtom<VtMapPlacesResult | null>["vTAtom"]
  >;
  shouldReloadFiltersAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  globalLocationSearchIndexesAtom: ReturnType<
    VTAtom<LocationSearchIndex[]>["vTAtom"]
  >;
  router: NextRouter;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default PracticesSearch;

export * from "./MobileSearchSection";
export * from "./PracticeSearchGMapsInput";
export * from "./PracticeSearchMap";
export * from "./PracticeSearchOnClose";
export * from "./PracticeSearchSelect";
export * from "./PracticesSearchDrawer";
export * from "./ServiceGroupDisplay";
export * from "./ServicesFiltering";
export { default as MobileSearchSection } from "./MobileSearchSection";
export { default as PracticeSearchGMapsInput } from "./PracticeSearchGMapsInput";
export { default as PracticeSearchMap } from "./PracticeSearchMap";
export { default as PracticeSearchOnClose } from "./PracticeSearchOnClose";
export { default as PracticeSearchSelect } from "./PracticeSearchSelect";
export { default as PracticesSearchDrawer } from "./PracticesSearchDrawer";
export { default as ServicesFiltering } from "./ServicesFiltering";
