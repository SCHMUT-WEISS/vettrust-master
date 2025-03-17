/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef } from "react";
import { useDatePickerState } from "react-stately";
import { FocusRing, useDatePicker } from "react-aria";
import { FieldButton } from "./ReactAriaDatePickerButton";
import { ReactAriaDatePickerCalendar } from "./ReactAriaDatePickerCalendar";
import { ReactAriaDatePickerDateField } from "./ReactAriaDatePickerDateField";
import { ReactAriaDatePickerPopover } from "./ReactAriaDatePickerPopover";
import { ReactAriaDatePickerDialog } from "./ReactAriaDatePickerDialog";
import {
  ExclamationCircled,
  Calendar as CalendarIcon
} from "../../../assets/icons";

export function ReactAriaDatePicker(props: any) {
  const state = useDatePickerState(props);
  const ref = useRef();
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment,@typescript-eslint/ban-ts-ignore
    // @ts-ignore
  } = useDatePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col text-left w-full">
      <span {...labelProps}>{props.label}</span>
      <FocusRing
        focusRingClass={`ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] rounded-[12px] ${
          (state as any).focusRingClassName
        }`}
      >
        <div
          {...groupProps}
          ref={ref as any}
          className="flex group outline-none w-full"
          tabIndex={0}
        >
          <div className="bg-white border border-gray-300 group-hover:border-magenta transition-colors rounded-l-[12px] pr-10 group-focus-within:border-sand-pressed group-focus-within:group-hover:border-magenta p-1 relative flex items-center h-[48px] flex-auto border-r-0 pl-[10px]">
            <ReactAriaDatePickerDateField {...fieldProps} />
            {state.validationState === "invalid" && (
              <ExclamationCircled className="w-6 h-6 text-red-500 absolute right-1" />
            )}
          </div>
          <FieldButton {...buttonProps} isPressed={state.isOpen}>
            <CalendarIcon className="w-5 h-5 text-darkBlue group-focus-within:text-darkBlue group-hover:text-magenta" />
          </FieldButton>
        </div>
      </FocusRing>
      {state.isOpen && (
        <ReactAriaDatePickerPopover
          triggerRef={ref}
          state={state}
          placement="bottom start"
        >
          <ReactAriaDatePickerDialog {...dialogProps}>
            <ReactAriaDatePickerCalendar {...calendarProps} />
          </ReactAriaDatePickerDialog>
        </ReactAriaDatePickerPopover>
      )}
    </div>
  );
}
