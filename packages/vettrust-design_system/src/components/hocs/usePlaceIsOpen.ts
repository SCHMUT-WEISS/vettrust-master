/* eslint-disable camelcase,indent,sonarjs/cognitive-complexity */
import moment, { Moment } from "moment-timezone";
import {
  OpeningHoursTime,
  OpeningPeriod,
} from "@googlemaps/google-maps-services-js";

export function useIsPlaceOpen(opening_hours_periods: OpeningPeriod[]) {
  if (!opening_hours_periods) return null;
  //  Instantiate the users current time
  const now = moment();

  //  Convert this time to Swiss
  const swissTime = now.tz("Europe/Zurich", false);

  //  Function to find opening periods for a given day of week number
  const getOpeningPeriodsForDay = (dayNumber: number) => {
    return opening_hours_periods.filter(period => {
      if (period.open.day === dayNumber) {
        return period;
      }
      return null;
    });
  };

  //  Get Current Day
  const dayOfWeek = swissTime.day();

  const momentOpen = (open: OpeningHoursTime) => {
    return swissTime.clone().set({
      hour: open.time?.substring(0, 2) as any,
      minute: open.time?.substring(2, 4) as any,
    });
  };
  const momentClose = (close: OpeningHoursTime) => {
    return close
      ? swissTime.clone().set({
          hour: close.time?.substring(0, 2) as any,
          minute: close.time?.substring(2, 4) as any,
        })
      : null;
  };

  const openingHoursDifferentDay = (swissTime: Moment) => {
    //  If it's not open today, find the next day it is.
    let nextDayOfWeek = swissTime.clone();

    let next_opening_hours_periods: OpeningPeriod[] = [];
    //  It might be open tomorrow, but it might be the day after that.
    //  Start with an empty array (above)
    //  While the array is empty, increment the day, and get the periods for that "day-number"
    while (next_opening_hours_periods.length < 1) {
      nextDayOfWeek = nextDayOfWeek.add({ day: 1 });
      next_opening_hours_periods = getOpeningPeriodsForDay(nextDayOfWeek.day());
    }

    //  Once you find an array with some items, take the first one, and get the opening time.
    const momentOpen = nextDayOfWeek.clone().set({
      hour: next_opening_hours_periods[0].open.time?.substring(0, 2) as any,
      minute: next_opening_hours_periods[0].open.time?.substring(2, 4) as any,
    });

    return {
      isOpen: false,
      opensAt: momentOpen,
    };
  };

  //  Filter to the periods which apply to today
  const todays_opening_hours_periods = getOpeningPeriodsForDay(dayOfWeek);

  const currentState = (
    swissTime: Moment,
    todays_opening_hours_periods: OpeningPeriod[]
  ) => {
    let openingHour;

    if (todays_opening_hours_periods.length >= 1) {
      todays_opening_hours_periods.forEach((period, ix) => {
        const { open, close } = period;
        if (ix === todays_opening_hours_periods.length - 1) {
          // If it's the last (or the only) shift

          if (
            swissTime.isBetween(
              momentOpen(open),
              momentClose(close as OpeningHoursTime)
            )
          ) {
            // If current time (client's time, which is NOW) is between the opening and closing hour

            openingHour = {
              isOpen: true, // practice is open
              closesAt: momentClose(close as OpeningHoursTime), // closes later today -> this is the last time this practice will be open for today
            };
          } else if (
            swissTime.isSameOrAfter(momentClose(close as OpeningHoursTime))
          ) {
            // If current time is after the  closing hour

            // Practice is closed - next open is on different day
            openingHour = openingHoursDifferentDay(swissTime);
          } else if (
            swissTime.isBefore(momentOpen(open)) &&
            todays_opening_hours_periods.length === 1
          ) {
            // If current time is before the opening hour time AND practice only has 1 "shift"
            openingHour = {
              isOpen: false, // practice is closed
              opensAt: momentOpen(open), // opens later today
            };
          }
        } else {
          // not the last (or the only) shift

          if (swissTime.isBefore(momentOpen(open)) && ix === 0) {
            // If current time is before the opening hour and is the first shift

            openingHour = {
              isOpen: false, // practice is closed
              opensAt: momentOpen(open), // opens later today
            };
          }

          if (
            swissTime.isBetween(
              momentOpen(open),
              momentClose(close as OpeningHoursTime)
            )
          ) {
            // If current time is between the opening and closing hour for this shift

            openingHour = {
              isOpen: true, // practice is open
              closesAt: momentClose(close as OpeningHoursTime), // closes later today (end of this shift - not the last shift)
            };
          }

          if (
            swissTime.isBetween(
              momentClose(close as OpeningHoursTime),
              momentOpen(todays_opening_hours_periods[ix + 1].open)
            )
          ) {
            //  If current time is between this shift's (not last shift) closing hour and the next opening hour
            openingHour = {
              isOpen: false, // practice is closed
              opensAt: momentOpen(todays_opening_hours_periods[ix + 1].open), // opens again later today
            };
          }
        }
      });
    } else {
      // If it's closed today

      // Opens on a different day
      openingHour = openingHoursDifferentDay(swissTime);
    }

    return openingHour;
  };

  return currentState(swissTime, todays_opening_hours_periods);
}
