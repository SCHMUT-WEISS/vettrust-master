import React from "react";
import { useAtom } from "jotai";
import { CircularProgress } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { ComponentProps, UseVtTranslateType, VTAtom } from "../../@types";
import { LocationFields } from "../../@types/content/CFClollectionLocation";

const AppointmentBookingModal: React.FC<
  ComponentProps<AppointmentBookingModalProps>
> = ({ currentlyDisplayedLocationAtom, muiTheme, useVtTranslate, customUseAtom, }) => {
  const { t } = useVtTranslate();
  const [currentLocation] = customUseAtom(currentlyDisplayedLocationAtom);
  const [isIframeLoaded, setIsIframeLoaded] = React.useState(false);

  return currentLocation && (currentLocation.bookingUrl || currentLocation.vestoriaId) ? (
    <div className="flex flex-row justify-center relative appointment-booking-modal-container overflow-hidden">
      {!isIframeLoaded && (
        <CircularProgress
          style={{ color: muiTheme.palette.primary.main }}
          size={30}
          className="absolute-center-Y"
        />
      )}
      <iframe
        src={currentLocation.bookingUrl ?? `https://booking.vetstoria.com/booking/${currentLocation.vestoriaId}?theme=widget&customisation=D52F89,D52F89,D52F89,ffffff,D52F89,1C3350,1C3350,1C3350,1C3350,1C3350&r=4`}
        frameBorder="0"
        hidden={!isIframeLoaded}
        onLoad={() => setIsIframeLoaded(true)}
        id="oabp-widget-iframe"
        scrolling="yes"
        title="Vetstoria Booking Widget"
        // style="box-shadow: none !important; border: medium none !important; overflow: hidden; height: 551px;"
        style={{
          boxShadow: "none !important",
          border: "medium none !important",
          height: "100%",
          width: "100%",
          visibility: isIframeLoaded ? "visible" : "hidden",
          overflowY: "scroll",
          overflowX: "hidden"
        }}
      />
    </div>
  ) : (
    <div className="max-w-full w-[800px] h-[550px] flex flex-row justify-center relative">
      <span className="absolute-center-Y">
        {t("ERRORS.SOMETHING_WENT_WRONG")}
      </span>
    </div>
  );
};

interface AppointmentBookingModalProps {
  currentlyDisplayedLocationAtom: ReturnType<
    VTAtom<LocationFields | null>["vTAtom"]
  >;
  muiTheme: Theme;
  useVtTranslate: UseVtTranslateType;
  customUseAtom: typeof useAtom;
}

export default AppointmentBookingModal;
