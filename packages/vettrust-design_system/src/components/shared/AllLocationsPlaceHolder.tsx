/*
 * It's one thing to have a component reload but it's another one to have a whole page reload
 * The data that the hook useLocation is fetching is often updated.
 * Because of that it's not optimized to have the whole page reload, especially for mobile devices.
 */

import React from "react";
import { useAtom } from "jotai";
import useAllLocations from "../hocs/useAllLocations";
import { UseVtTranslateType, VTAtom } from "../../@types";
import { CFCollectionLocation } from "../../@types/content/CFClollectionLocation";
import { LocationsPlacedData } from "../../@types/atoms";

const AllLocationsPlaceHolder = ({
  allLocationsAtom,
  allLocationsGPlacesDataAtom,
  allLocationsLoadingAtom,
  useVtTranslate,
  customUseAtom,
}: AllLocationsPlaceholderProps) => {
  useAllLocations({
    allLocationsAtom,
    allLocationsGPlacesDataAtom,
    allLocationsLoadingAtom,
    useVtTranslate,
    customUseAtom,
  });
  return <React.Fragment />;
};

interface AllLocationsPlaceholderProps {
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  allLocationsLoadingAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default AllLocationsPlaceHolder;
