/* eslint-disable react/require-default-props,react/no-unknown-property */
import React, { useRef } from "react";
import { FocusRing, useTextField } from "react-aria";
import {
  FormTextInputProps,
  InputChangeState,
} from "../../@types/components/inputs";

const TextInput = ({
  labelKey,
  forText,
  isRequired,
  classes,
  tabIndex,
  placeHolder,
  onChange,
  changeState = InputChangeState.UNTOUCHED,
  errorMessage,
  onBlur,
  disabled,
  name,
  focusRingClassName,
  value,
}: FormTextInputProps) => {
  const ref = useRef();

  const [typingStateClassName, setTypingStateClassName] = React.useState("");
  const isInvalid = changeState === InputChangeState.INVALID;
  const disabledClass = disabled ? "bg-sand text-sand-pressed" : "";
  const { inputProps, labelProps } = useTextField(
    {
      onBlur: event => {
        setTypingStateClassName("");
        if (onBlur) {
          onBlur(event as any);
        }
      },
      id: forText,
      type: "text",
      isDisabled: disabled,
      isRequired: Boolean(isRequired),
      name: name || forText,
      onInput: event => {
        setTypingStateClassName("input__typing");
        if (onChange) {
          onChange(event.currentTarget.value, event as any);
        }
      },
      "aria-label": forText,
    },
    ref as any
  );

  return (
    <div
      className={`rounded-[12px] relative z-[10] ${classes?.container}`}
      item-state={changeState}
    >
      {labelKey && (
        <label
          htmlFor={forText}
          className={`font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans ${classes?.label}`}
          {...labelProps}
        >
          {labelKey}
          {isRequired && <span className="text-red-600 ml-[4px]">*</span>}
        </label>
      )}
      <div className="relative">
        <FocusRing
          focusRingClass={`ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] ${focusRingClassName}`}
          isTextInput
        >
          <input
            {...(inputProps as any)}
            type="text"
            tabIndex={tabIndex}
            placeholder={placeHolder || labelKey}
            className={`flex-auto rounded-[12px] pl-[16px] h-[48px] w-full relative input  ${
              classes?.input
            } ${
              changeState === InputChangeState.INVALID
                ? "border-red-500 border-[1px]"
                : ""
            } ${disabledClass} ${typingStateClassName}`}
            ref={ref}
            value={value}
          />
        </FocusRing>
      </div>
      {isInvalid && (
        <p className="text-red-400 p-0 text-sm font-light">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextInput;
