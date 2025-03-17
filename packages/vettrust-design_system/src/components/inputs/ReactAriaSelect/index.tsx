/* eslint-disable react/button-has-type,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
/*
 * This is the implementation to have the select dropdown behave the way it was intended in the
 * design system. Main functionality evolves around react-aria
 * */

import * as React from "react";
import type { AriaSelectProps } from "@react-types/select";
import { useSelectState } from "react-stately";
import { useSelect, HiddenSelect, useButton, FocusRing } from "react-aria";

import { ReactNode } from "react";
import { ReactAriaSelectListbox } from "./ReactAriaSelectListbox";
import { ReactAriaSelectPopover } from "./ReactAriaSelectPopover";
import { Merge, UseVtTranslateType } from "../../../@types";
import { ChevronDown } from "../../../assets/icons";

export { Item } from "react-stately";

type SelectProps<T extends object> = Merge<
  AriaSelectProps<T>,
  {
    focusRingClassName?: string;
    className?: string;
    defaultLabel?: string | ReactNode;
    useVtTranslate: UseVtTranslateType;
  }
>;

export function ReactAriaSelect<T extends object>(props: SelectProps<T>) {
  // Create state based on the incoming props
  const state = useSelectState(props);
  const { t } = props.useVtTranslate("common");

  // Get props for child elements from useSelect
  const ref = React.useRef(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );

  // Get props for the button based on the trigger props from useSelect
  const { buttonProps } = useButton(triggerProps, ref);

  return (
    <div className="inline-flex flex-col relative w-full">
      <div
        {...labelProps}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {props.label}
      </div>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <FocusRing
        focusRingClass={`ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] ${props.focusRingClassName}`}
        isTextInput
      >
        <button
          {...buttonProps}
          ref={ref}
          className={`flex flex-row items-center justify-between h-[48px] px-[16px] rounded-[12px] hover:border-magenta hover:border-[1px] hover:text-lightBlue-1.5 outline-none  ${
            state.isOpen ? "bg-magenta/5 border-magenta" : "bg-white"
          } ${props.className}`}
        >
          <span
            {...valueProps}
            className={`text-md ${
              state.selectedItem ? "text-gray-800" : "text-gray-500"
            }`}
          >
            {state.selectedItem
              ? state.selectedItem.rendered
              : props.defaultLabel || t("OTHERS.PLEASE_SELECT")}
          </span>
          <ChevronDown className="w-[20px] h-[20px]" />
        </button>
      </FocusRing>
      {state.isOpen && (
        <ReactAriaSelectPopover isOpen={state.isOpen} onClose={state.close}>
          <ReactAriaSelectListbox {...menuProps} state={state} />
        </ReactAriaSelectPopover>
      )}
    </div>
  );
}
