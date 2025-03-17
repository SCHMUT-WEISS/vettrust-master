import React from "react";
import { useAtom } from "jotai";
import { Theme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import { ComponentProps, UseVtTranslateType } from "../../@types";

interface CalendlyBookingModalProps {
  useVtTranslate?: UseVtTranslateType;
  customUseAtom?: typeof useAtom;
  muiTheme: Theme;
  handleClose: () => void;
}

const CalendlyWidgetModal: React.FC<ComponentProps<CalendlyBookingModalProps>> = ({ muiTheme, handleClose }) => {
  const [isIframeLoaded, setIsIframeLoaded] = React.useState(false);

  function isCalendlyEvent(e: { origin: string; data: { event: string } }) {
    return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
  }

  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    window.addEventListener("message", (e) => {
      if(isCalendlyEvent(e)) {
        if(e.data.event === 'calendly.event_type_viewed') setIsIframeLoaded(true);
        if(e.data.event === 'calendly.profile_page_viewed') console.log('calendly.profile_page_viewed');
        if(e.data.event === 'calendly.date_and_time_selected') console.log('calendly.date_and_time_selected');
        if(e.data.event === 'calendly.event_scheduled') handleClose();
      }
    });
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      setIsIframeLoaded(false);
    };
  }, []);
  return (
    <div className="flex flex-row justify-center relative calendly-modal-container overflow-hidden">
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
        data-url={process.env.NEXT_PUBLIC_CALENDLY_URL} 
        style={{ minWidth: '100%', height: '100%', display: isIframeLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};


export default CalendlyWidgetModal;
