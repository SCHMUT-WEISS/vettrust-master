/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Dialog } from "@mui/material";
import React from "react";
import { useAtom } from "jotai";
import { Theme } from "@mui/material/styles";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { modalSelector } from "./modalSelector";
import { Times } from "../../assets/icons";
import {
  ComponentProps,
  UseVtTranslateType,
  VTAtom,
  CFPageLocationCommonMetadata,
  LocationFields,
  CFCollectionAnnouncement,
  CfCollectionEmployee,
  CfCollectionService,
  ModalsState,
  VTPlatformURLS
} from "../../@types";
import onCloseModalHandlers from "./onCloseModalHandlers";

/* This is the base Modal Component.
 * It contains all logic for closing, opening and selecting which modal to display
 * */
const ModalsContainer: React.FC<ComponentProps<ModalsContainerProps>> = ({
  currentlyDisplayedServiceAtom,
  currentModalAtom,
  locationGooglePlacesDataAtom,
  locationPageMetaAtom,
  currentlyDisplayedLocationAtom,
  muiTheme,
  currentlyDisplayedAnnouncementAtom,
  currentlyDisplayedTeamMemberAtom,
  router,
  useVtTranslate,
  customUseAtom,
  platformUrl,
}) => {
  const [currentModal, setCurrentModal] = customUseAtom(currentModalAtom);
  const [, setCurrentlyDisplayedService] = customUseAtom(
    currentlyDisplayedServiceAtom
  );

  const vtPlatfromrUrl = platformUrl || VTPlatformURLS.VETTRUST;

  const handleClose = () => {
    setCurrentModal({ type: null, minWidth: "sm" });
    onCloseModalHandlers();
    setCurrentlyDisplayedService(null);
  };

  return (
    <Dialog
      open={Boolean(currentModal.type)}
      maxWidth={false}
      onClose={handleClose}
      sx={{
        borderRadius: "12px",
        [muiTheme.breakpoints.down("sm")]: {
          "& .MuiDialog-container .MuiDialog-paper": {
            margin: "20px",
            maxWidth: "calc(100% - 40px)",
          },
          "& .MuiDialog-paper": {
            borderRadius: "12px !important"
          }
        },
      }}
    >
      <div className="w-full bg-white rounded-[12px] relative z-[10]">
        <div className="text-right w-full flex flex-row justify-end absolute w-full top-0 z-[1]">
          <div className="rounded-full bg-white p-[8px]">
            <Avatar
              variant="circular"
              className="bg-darkBlue w-[32px] h-[32px] rounded-full"
              sx={{
                height: "32px",
                width: "32px",
                backgroundColor: muiTheme.palette.primary.main
              }}
              onClick={handleClose}
            >
              <Times className="cursor-pointer text-white w-[16px] h-[16px]" />
            </Avatar>
          </div>
        </div>
        <div className="z-[1] bg-transparent">
          {modalSelector(
            currentModal.type,
            handleClose,
            useVtTranslate,
            currentModalAtom,
            locationGooglePlacesDataAtom,
            locationPageMetaAtom,
            currentlyDisplayedLocationAtom,
            muiTheme,
            currentlyDisplayedAnnouncementAtom,
            currentlyDisplayedTeamMemberAtom,
            currentlyDisplayedServiceAtom,
            router,
            customUseAtom,
            vtPlatfromrUrl,
          )}
        </div>
      </div>
    </Dialog>
  );
};

interface ModalsContainerProps {
  currentlyDisplayedServiceAtom: ReturnType<
    VTAtom<CfCollectionService["fields"] | null>["vTAtom"]
  >;
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>;
  useVtTranslate: UseVtTranslateType;
  locationGooglePlacesDataAtom: ReturnType<
    VTAtom<Partial<PlaceData> | null>["vTAtom"]
  >;
  locationPageMetaAtom: ReturnType<
    VTAtom<CFPageLocationCommonMetadata["fields"] | null>["vTAtom"]
  >;
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  muiTheme: Theme;
  currentlyDisplayedAnnouncementAtom: ReturnType<
    VTAtom<CFCollectionAnnouncement | null>["vTAtom"]
  >;
  currentlyDisplayedTeamMemberAtom: ReturnType<
    VTAtom<CfCollectionEmployee | null>["vTAtom"]
  >;
  router: any;
  customUseAtom: typeof useAtom;
  platformUrl?: VTPlatformURLS;
}

export default ModalsContainer;
export * from "./AllOpeningHours";
export * from "./AnnouncementModal";
export * from "./AppointmentBookingModal";
export * from "./CareerSignupModal";
export * from "./ContactModal";
export * from "./EmergencyModal";
export * from "./ServiceDetails";
export * from "./SignupSuccess";
export * from "./TeamMemberDetails";
export * from "./modalSelector";
export * from "./onCloseModalHandlers";
export { default as AllOpeningHours } from "./AllOpeningHours";
export { default as AnnouncementModal } from "./AnnouncementModal";
export { default as AppointmentBookingModal } from "./AppointmentBookingModal";
export { default as CareerSignupModal } from "./CareerSignupModal";
export { default as ContactModal } from "./ContactModal";
export { default as EmergencyModal } from "./EmergencyModal";
export { default as ServiceDetails } from "./ServiceDetails";
export { default as SignupSuccess } from "./SignupSuccess";
export { default as TeamMemberDetails } from "./TeamMemberDetails";
