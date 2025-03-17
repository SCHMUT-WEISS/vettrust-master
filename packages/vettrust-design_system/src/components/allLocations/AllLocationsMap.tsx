/* eslint-disable sonarjs/no-identical-functions,no-use-before-define */
import React from "react";
import { Theme } from "@mui/material/styles";
import { useAtom } from "jotai";
import VetTrustMapMobile from "../VtMap/VetTrustMapMobile";
import Heading from "../shared/Heading";
import VetTrustMap from "../VtMap/VetTrustMap";
import {
  CFCollectionLocation,
  LocationFields,
  ComponentProps,
  VTAtom,
  LocationsPlacedData,
  ModalsState,
  UseVtTranslateType
} from "../../@types";
import { useWindowDimension } from "../hocs";
import { NextRouter } from "../../@types/next";

const AllLocationsMap: React.FC<ComponentProps<AllLocationsMapProps>> = ({
  locationsToShow,
  isLoading,
  allLocationsGPlacesDataAtom,
  currentModalAtom,
  currentlyDisplayedLocationAtom,
  router,
  allLocationsAtom,
  muiTheme,
  useVtTranslate,
  customUseAtom,
  isPracticeSearchModalDisplayedAtom,
}) => {
  const { t } = useVtTranslate("location");
  // Just to have the component reload when the window dimensions change to help Gmaps render correctly
  useWindowDimension({ onlyX: true });

  return (
    <React.Fragment>
      <VetTrustMapMobile
        pinIcon="all-locations"
        displayedPins={locationsToShow
          .filter((el) => el.fields.address && el.fields.address.lat)
          .map(
            (location) =>
              ({
                lat: location.fields.address.lat,
                lng: location.fields.address.lon,
                locationId: location.sys.id
              } as any)
          )}
        isLoading={isLoading}
        title={
          <React.Fragment>
            <div className="text-lightBlue-1.5">
              {t("ALL_LOCATIONS.OUR_LOCATIONS")}
            </div>
            <Heading
              level="h3"
              text={t("ALL_LOCATIONS.LOCATIONS_COUNT", {
                count: locationsToShow.length
              })}
            />
          </React.Fragment>
        }
        className="lg:hidden"
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
      <div className="h-[136px] lg:h-[460px] default-radius overflow-hidden hidden lg:block">
        <VetTrustMap
          pinIcon="all-locations"
          displayedPins={locationsToShow
            .filter((el) => el.fields.address && el.fields.address.lat)
            .map(
              (location) =>
                ({
                  lat: location.fields.address.lat,
                  lng: location.fields.address.lon,
                  locationId: location.sys.id
                } as any)
            )}
          isLoading={isLoading}
          allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
          currentModalAtom={currentModalAtom}
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          router={router}
          allLocationsAtom={allLocationsAtom}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
          isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
        />
      </div>
    </React.Fragment>
  );
};

interface AllLocationsMapProps {
  locationsToShow: CFCollectionLocation[];
  isLoading: boolean;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  router: NextRouter;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  muiTheme: Theme;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
}

export default AllLocationsMap;
