/* eslint-disable import/no-extraneous-dependencies,react/require-default-props */
import moment, { Moment } from "moment-timezone";
import "moment/locale/de";
import "moment/locale/en-ca";
import React from "react";
import { OpeningPeriod } from "@googlemaps/google-maps-services-js";
import { UseVtTranslateType } from "../../../@types";
import { useIsPlaceOpen } from "../../../components/hocs";

export const OpeningHoursSummary = ({
  periods,
  className,
  useVtTranslate
}: {
  periods: OpeningPeriod[];
  className?: string;
  useVtTranslate: UseVtTranslateType;
}) => {
  const { t, i18n } = useVtTranslate("location");
  const openingHours:
    | { isOpen: boolean; opensAt: Moment; closesAt?: Moment }
    | null
    | undefined = useIsPlaceOpen(periods);

  if (!periods || periods.length === 0) return null;

  //    First Check if Open 24 hour
  if (!periods[0].close) {
    return (
      <span className={`text-vtGreen ${className}`}>
        {t("OPENING_HOURS.24_7")}
      </span>
    );
  }

  //    Open State
  if (openingHours && openingHours.isOpen) {
    return (
      <span className={`text-darkBlue ${className}`}>
        {t("OPENING_HOURS.OPENED_UNTIL", {
          closing_hour: moment(openingHours.closesAt).format("HH:mm")
        })}
      </span>
    );
  }

  //    Otherwise must be closed - Work out when it next opens
  const swissTimeNow = moment().tz("Europe/Zurich");

  const nextOpen = moment(openingHours?.opensAt);
  const nextOpenTime = nextOpen.format("HH:mm");

  if (nextOpen.day() === swissTimeNow.day()) {
    // Opens today at...
    return (
      <span className={`text-darkBlue ${className}`}>
        {t("OPENING_HOURS.OPENS_TODAY_AT", { opening_hour: nextOpenTime })}
      </span>
    );
  }

  if (nextOpen.day() === swissTimeNow.add({ day: 1 }).day()) {
    // Opens tomorrow at...
    return (
      <span className={`text-darkBlue ${className}`}>
        {t("OPENING_HOURS.OPENS_TOMORROW_AT", { opening_hour: nextOpenTime })}
      </span>
    );
  }
  // Opens on [a day] at...
  return (
    <span className={`text-darkBlue ${className}`}>
      {t("OPENING_HOURS.OPENS_ON_A_DAY_AT", {
        day: nextOpen
          .locale(i18n?.language === "en" ? "en-ca" : "de")
          .format("dddd"),
        opening_hour: nextOpenTime
      })}
    </span>
  );
};
