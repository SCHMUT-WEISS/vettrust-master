import { atom } from "jotai";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import {
  LocationFields,
  CfCollectionService,
  CFPageLocationCommonMetadata,
  CfCollectionEmployee,
  CFCollectionAnnouncement,
} from "@somethingcreative-agency/vettrust-design_system";

/* The location that is currently displayed */
export const currentlyDisplayedLocationAtom = atom<LocationFields | null>(null);

/* Google Places Data for the location that is being displayed */
export const locationGooglePlacesDataAtom = atom<Partial<PlaceData> | null>(
  null
);

export const currentlyDisplayedServiceAtom = atom<
  CfCollectionService["fields"] | null
>(null);

/* The global emergency number */
export const locationPageMetaAtom = atom<
  CFPageLocationCommonMetadata["fields"] | null
>(null);

/* The team member to be displayed in a modal */
export const currentlyDisplayedTeamMemberAtom =
  atom<CfCollectionEmployee | null>(null);

/* The announcement that is currently displayed */
export const currentlyDisplayedAnnouncementAtom =
  atom<CFCollectionAnnouncement | null>(null);
