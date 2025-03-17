/* eslint-disable indent,sonarjs/no-small-switch,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from "react";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Theme } from "@mui/material/styles";

import { useAtom } from "jotai";
import {
  ModalsOptions,
  ModalsState,
  VTAtom,
  CFPageLocationCommonMetadata,
  LocationFields,
  CFCollectionAnnouncement,
  CfCollectionEmployee,
  CfCollectionService,
  UseVtTranslateType,
  VTPlatformURLS
} from "../../@types";
import CareerSignupModal from "./CareerSignupModal";
import SignupSuccess from "./SignupSuccess";
import ServiceDetails from "./ServiceDetails";
import AllOpeningHours from "./AllOpeningHours";
import EmergencyModal from "./EmergencyModal";
import TeamMemberDetails from "./TeamMemberDetails";
import AppointmentBookingModal from "./AppointmentBookingModal";
import ContactModal from "./ContactModal";
import AnnouncementModal from "./AnnouncementModal";
import VestoriaWidgetModal from "./VestoriaWidget";
import CalendlyWidgetModal from "./CalendlyWidgetModal";
import { ReferralForm } from "../location";

export function modalSelector(
  currentModal: ModalsOptions | null,
  handleClose = () => {},
  useVtTranslate: UseVtTranslateType,
  currentModalAtom: ReturnType<VTAtom<ModalsState["currentModal"]>["vTAtom"]>,

  locationGooglePlacesDataAtom: ReturnType<
    VTAtom<Partial<PlaceData> | null>["vTAtom"]
  >,
  locationPageMetaAtom: ReturnType<
    VTAtom<CFPageLocationCommonMetadata["fields"] | null>["vTAtom"]
  >,
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >,
  muiTheme: Theme,
  currentlyDisplayedAnnouncementAtom: ReturnType<
    VTAtom<CFCollectionAnnouncement | null>["vTAtom"]
  >,
  currentlyDisplayedTeamMemberAtom: ReturnType<
    VTAtom<CfCollectionEmployee | null>["vTAtom"]
  >,
  currentlyDisplayedServiceAtom: ReturnType<
    VTAtom<CfCollectionService["fields"] | null>["vTAtom"]
  >,
  router: any,
  customUseAtom: typeof useAtom,
  platformUrl: VTPlatformURLS
) {
  switch (currentModal) {
    case ModalsOptions.REFERRAL_FORM:
      return <ReferralForm router={router} useVtTranslate={useVtTranslate} />;

    case ModalsOptions.CAREER_SIGNUP:
      return (
        <CareerSignupModal
          currentModalAtom={currentModalAtom}
          router={router}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      );

    case ModalsOptions.SIGNUP_SUCCESS:
      return (
        <SignupSuccess
          currentModalAtom={currentModalAtom}
          router={router}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      );

    case ModalsOptions.SERVICE_DETAILS:
      return (
        <ServiceDetails
          currentModalAtom={currentModalAtom}
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          currentlyDisplayedServiceAtom={currentlyDisplayedServiceAtom}
          router={router}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      );

    case ModalsOptions.ALL_OPENING_HOURS:
      return (
        <AllOpeningHours
          locationGooglePlacesDataAtom={locationGooglePlacesDataAtom}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      );

    case ModalsOptions.EMERGENCY:
      return (
        <EmergencyModal
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          locationPageMetaAtom={locationPageMetaAtom}
          router={router}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
          platformUrl={platformUrl}
        />
      );

    case ModalsOptions.LOCATION_TEAM_MEMBER_DETAILS:
      return (
        <TeamMemberDetails
          currentlyDisplayedTeamMemberAtom={currentlyDisplayedTeamMemberAtom}
          customUseAtom={customUseAtom}
        />
      );

    case ModalsOptions.LOCATION_APPOINTMENT_BOOKING:
      return (
        <AppointmentBookingModal
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          muiTheme={muiTheme}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      );

    case ModalsOptions.CONTACT_MODAL:
      return (
        <ContactModal
          currentModalAtom={currentModalAtom}
          currentlyDisplayedLocationAtom={currentlyDisplayedLocationAtom}
          router={router}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      );

    case ModalsOptions.ANNOUNCEMENT:
      return (
        <AnnouncementModal
          currentModalAtom={currentModalAtom}
          currentlyDisplayedAnnouncementAtom={
            currentlyDisplayedAnnouncementAtom
          }
          router={router}
          useVtTranslate={useVtTranslate}
          customUseAtom={customUseAtom}
        />
      );

    case ModalsOptions.VESTORIA_WIDGET:
      return <VestoriaWidgetModal muiTheme={muiTheme} />;

    case ModalsOptions.CALENDLY_WIDGET:
      return (
        <CalendlyWidgetModal muiTheme={muiTheme} handleClose={handleClose} />
      );

    default:
      return <div onClick={handleClose} />;
  }
}
