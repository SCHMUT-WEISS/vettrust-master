/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef } from "react";
import { FocusRing } from "react-aria";
import {
  ExclamationCircled,
  Calendar as CalendarIcon
} from "../../../assets/icons";
import DatePicker from "react-date-picker";

export function BaseDateInput(props: any) {
  const ref = useRef();
  return (
    <div className="relative inline-flex flex-col text-left w-full">
      <span>{props.label}</span>
      <FocusRing
        focusRingClass={`ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] rounded-[12px] ${
          props.focusRingClassName ?? ""
        }`}
      >
        <div
          // {...groupProps}
          ref={ref as any}
          className="flex group outline-none w-full"
          tabIndex={0}
        >
          <DatePicker
            className={`w-full bg-white border border-gray-300 rounded-[12px] pl-[16px] h-[48px] flex-auto transition-colors group-hover:border-magenta group-focus-within:border-sand-pressed group-focus-within:group-hover:border-magenta ${props.classes?.input}`}
            onChange={props.onChange}
            value={props.value}
            required={props.required}
            locale={props.locale ?? "en-GB"}
            format={props.format ?? "dd/MM/yyyy"}
            disableCalendar={props.disabled}
            disabled={props.disabled}
            name={props.name}
            calendarIcon={
              props.validationStatese ? (
                <ExclamationCircled className="w-6 h-6 text-red-500 absolute right-1" />
              ) : (
                <CalendarIcon className="w-5 h-5 text-darkBlue group-focus-within:text-darkBlue group-hover:text-magenta" />
              )
            }
          />
        </div>
      </FocusRing>
    </div>
  );
}
