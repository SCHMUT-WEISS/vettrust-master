import React, { useRef } from "react";
import { useCalendarState } from "react-stately";
import { useCalendar, useLocale } from "react-aria";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./ReactAriaDatePickerButton";
import { ReactAriaDatePickerCalendarGrid } from "./ReactAriaDatePickerCalendarGrid";
import { ChevronLeft, ChevronRight } from "../../../assets/icons";

export function ReactAriaDatePickerCalendar(props: any) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar
  });

  const ref = useRef();
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-ts-ignore
    // @ts-ignore
    useCalendar(props, state, ref);

  return (
    <div
      {...calendarProps}
      ref={ref as any}
      className="inline-block text-gray-800"
    >
      <div className="flex items-center pb-4">
        <h2 className="flex-1 font-bold text-xl ml-2">{title}</h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeft className="h-6 w-6" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRight className="h-6 w-6" />
        </CalendarButton>
      </div>
      <ReactAriaDatePickerCalendarGrid state={state} />
    </div>
  );
}
