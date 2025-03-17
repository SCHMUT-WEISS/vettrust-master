import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { Theme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { ComponentProps, UseVtTranslateType } from "../../@types";

interface AppointmentBookingModalProps {
  useVtTranslate?: UseVtTranslateType;
  customUseAtom?: typeof useAtom;
  muiTheme: Theme;
}

const VestoriaWidgetModal: React.FC<
  ComponentProps<AppointmentBookingModalProps>
> = ({ muiTheme }) => {
  const [isIframeLoaded, setIsIframeLoaded] = React.useState(false);

  function isCalendlyEvent(e: { origin: string; data: { event: string } }) {
    return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    window.addEventListener("message", (e) => {
      if(isCalendlyEvent(e)) {
        if(e.data.event === 'calendly.event_type_viewed') setIsIframeLoaded(true);
        if(e.data.event === 'calendly.profile_page_viewed') console.log('calendly.profile_page_viewed');
        if(e.data.event === 'calendly.date_and_time_selected') console.log('calendly.date_and_time_selected');
        if(e.data.event === 'calendly.event_scheduled	') console.log('calendly.event_scheduled');
      }
    });
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      setIsIframeLoaded(false);
    };
  }, []);
  return (
    <div className="flex flex-row justify-center relative appointment-booking-modal-container overflow-hidden">
      {!isIframeLoaded && (
        <CircularProgress
          style={{ color: muiTheme.palette.primary.main }}
          size={30}
          className="absolute-center-Y"
        />
      )}
      <div 
        id="calendly-embed"
        className="calendly-inline-widget" 
        data-url="https://calendly.com/marketing-vettrust/telemedicine-test?background_color=142e55&text_color=ffffff&primary_color=d52e89" 
        style={{ minWidth: '100%', height: '100%', display: isIframeLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};


export default VestoriaWidgetModal;
