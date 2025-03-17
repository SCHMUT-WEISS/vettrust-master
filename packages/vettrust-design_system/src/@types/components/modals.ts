/* Enum to summarize all possible modals in the app */
export enum ModalsOptions {
  REFERRAL_FORM = "REFERRAL_FORM",
  CAREER_SIGNUP = "CAREER_SIGNUP",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  SERVICE_DETAILS = "SERVICE_DETAILS",
  ALL_OPENING_HOURS = "ALL_OPENING_HOURS",
  EMERGENCY = "EMERGENCY",
  LOCATION_TEAM_MEMBER_DETAILS = "LOCATION_TEAM_MEMBER_DETAILS",
  LOCATION_APPOINTMENT_BOOKING = "LOCATION_APPOINTMENT_BOOKING",
  CONTACT_MODAL = "CONTACT_MODAL",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  VESTORIA_WIDGET = "VESTORIA_WIDGET",
  CALENDLY_WIDGET= "CALENDLY_WIDGET"
}

/* State that shows weather or not a modal is being displayed and with which min width */
export interface ModalsState {
  currentModal: {
    type: ModalsOptions | null;
    minWidth: "xs" | "sm" | "md" | "lg" | "xl";
  };
}
