/* eslint-disable react/button-has-type */
import React, { useRef } from "react";
import { useButton, useFocusRing, mergeProps } from "react-aria";

export function CalendarButton(props: any) {
  const ref = useRef();
  const { buttonProps } = useButton(props, ref as any);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref as any}
      className={`p-2 rounded-full ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-white active:bg-magenta/5" : ""
      } outline-none ${
        isFocusVisible
          ? "ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px]"
          : ""
      }`}
    >
      {props.children}
    </button>
  );
}

export function FieldButton(props: any) {
  const ref = useRef();
  const { buttonProps, isPressed } = useButton(props, ref as any);
  return (
    <button
      {...buttonProps}
      ref={ref as any}
      className={`pl-2 pr-[16px] -ml-px border transition-colors rounded-r-[12px] group-focus-within:border-sand-pressed group-focus-within:group-hover:border-magenta group-hover:border-magenta outline-none hover:border-magenta ${
        isPressed || props.isPressed
          ? "bg-magenta/5 border-sand-pressed group-active:bg-magenta/5"
          : "bg-white border-gray-300 group-hover:border-magenta"
      }`}
    >
      {props.children}
    </button>
  );
}
