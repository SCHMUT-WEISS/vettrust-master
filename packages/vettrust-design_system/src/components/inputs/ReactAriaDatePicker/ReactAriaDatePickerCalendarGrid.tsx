/* eslint-disable react/no-array-index-key */
import React from "react";
import { useCalendarGrid, useLocale } from "react-aria";
import { CalendarDate, getWeeksInMonth } from "@internationalized/date";
import { ReactAriaDatePickerCalendarCell } from "./ReactAriaDatePickerCalendarCell";

export function ReactAriaDatePickerCalendarGrid({ state, ...props }: any) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-gray-600">
        <tr>
          {weekDays.map((day, index) => (
            <th className="text-center" key={index}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date: CalendarDate | null, i: number) =>
                date ? (
                  <ReactAriaDatePickerCalendarCell
                    key={i}
                    state={state}
                    date={date}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
