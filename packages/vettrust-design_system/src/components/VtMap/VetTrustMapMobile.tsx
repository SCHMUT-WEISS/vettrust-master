/* eslint-disable no-use-before-define */
import React, { ReactNode, useState } from "react";
import { Avatar, SwipeableDrawer } from "@mui/material";

import { Theme } from "@mui/material/styles";
import { useAtom } from "jotai";
import {
  VtMapPinCoordinates,
  ComponentProps,
  VTAtom,
  CFCollectionLocation,
  LocationFields,
  LocationsPlacedData,
  ModalsState,
  UseVtTranslateType
} from "../../@types";
import VetTrustMap from "./VetTrustMap";
import Paragraph from "../shared/Paragraph";
import { Times } from "../../assets/icons";
import { NextRouter } from "../../@types/next";

const EmptyPinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_7905_37609)">
      <path
        d="M14 6.66602C14 11.3327 8 15.3327 8 15.3327C8 15.3327 2 11.3327 2 6.66602C2 5.07472 2.63214 3.54859 3.75736 2.42337C4.88258 1.29816 6.4087 0.666016 8 0.666016C9.5913 0.666016 11.1174 1.29816 12.2426 2.42337C13.3679 3.54859 14 5.07472 14 6.66602Z"
        stroke="#132F55"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.66602C9.10457 8.66602 10 7.77058 10 6.66602C10 5.56145 9.10457 4.66602 8 4.66602C6.89543 4.66602 6 5.56145 6 6.66602C6 7.77058 6.89543 8.66602 8 8.66602Z"
        stroke="#132F55"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_7905_37609">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const VetTrustMapMobile: React.FC<ComponentProps<VtMapMobileProps>> = ({
  isLoading,
  displayedPins,
  pinIcon,
  className,
  title,
  disabled,
  allLocationsAtom,
  allLocationsGPlacesDataAtom,
  currentlyDisplayedLocationAtom,
  currentModalAtom,
  router,
  muiTheme,
  useVtTranslate,
  customUseAtom,
  isPracticeSearchModalDisplayedAtom,
}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const { t } = useVtTranslate("location");

  return (
    <React.Fragment>
      <div
        className={`default-radius overflow-hidden w-full h-[136px] relative ${className}`}
      >
        <button
          type="button"
          className={`absolute w-full h-full z-[10] cursor-pointer ${
            disabled ? "cursor-no-drop" : "cursor-pointer"
          }`}
          style={{
            background:
              "linear-gradient(113.03deg, rgba(255, 255, 255, 0.5) 35.19%, #FFFFFF 83.35%)"
          }}
          onClick={() => setOpen(true)}
          disabled={disabled}
        >
          <div className="flex flex-row items-center gap-[8px] w-[175px] absolute right-[16px] bottom-[16px]">
            <EmptyPinIcon />
            <Paragraph
              type="body_2"
              className="font-semibold text-darkBlue font-NotoSans"
            >
              {t("ALL_LOCATIONS.MOBILE_MAP_BUTTON_TEXT")}
            </Paragraph>
          </div>
        </button>
        <VetTrustMap
          isLoading={isLoading}
          displayedPins={displayedPins}
          pinIcon={pinIcon}
          router={router}
          allLocationsAtom={allLocationsAtom}
          currentModalAtom={currentModalAtom}
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
          isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
        />
      </div>
      {/* @ts-ignore */}
      <SwipeableDrawer
        anchor="bottom"
        open={open}
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
        <div className="relative">
          <div className="p-[20px] flex flex-row justify-between w-full absolute z-[10] bg-[linear-gradient(180deg,_#FFFFFF_40.51%,_rgba(255,_255,_255,_0)_100%)]">
            <div>{title}</div>
            <Avatar
              variant="circular"
              className="bg-darkBlue w-[32px] h-[32px] rounded-full cursor-pointer"
              sx={{
                height: "32px",
                width: "32px",
                backgroundColor: muiTheme.palette.primary.main
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              <Times className="cursor-pointer text-white w-[16px] h-[16px]" />
            </Avatar>
          </div>
          <div className="overflow-hidden w-screen h-screen">
            <VetTrustMap
              isLoading={isLoading}
              displayedPins={displayedPins}
              pinIcon={pinIcon}
              router={router}
              allLocationsAtom={allLocationsAtom}
              currentModalAtom={currentModalAtom}
              currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
              allLocationsGPlacesDataAtom={allLocationsGPlacesDataAtom}
              useVtTranslate={useVtTranslate}
              customUseAtom={customUseAtom}
              isPracticeSearchModalDisplayedAtom={isPracticeSearchModalDisplayedAtom}
            />
          </div>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

interface VtMapMobileProps {
  isLoading?: boolean;
  displayedPins: VtMapPinCoordinates[];
  pinIcon: "default" | "all-locations";
  title?: string | ReactNode;
  disabled?: boolean;
  allLocationsAtom: ReturnType<VTAtom<CFCollectionLocation[]>["vTAtom"]>;
  allLocationsGPlacesDataAtom: ReturnType<
    VTAtom<LocationsPlacedData[]>["vTAtom"]
  >;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  router: NextRouter;
  muiTheme: Theme;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
  isPracticeSearchModalDisplayedAtom: ReturnType<VTAtom<boolean>["vTAtom"]>;
}

export default VetTrustMapMobile;
