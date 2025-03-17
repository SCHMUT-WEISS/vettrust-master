/* eslint-disable jsx-a11y/no-noninteractive-tabindex,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,import/no-extraneous-dependencies,indent,react/no-unknown-property,no-unused-expressions */
import React, { useLayoutEffect, useRef } from "react";
// eslint-disable-next-line import/no-unresolved
import { ComponentProps } from "../../@types";
import {
  DatePickerInputProps,
  InputChangeState
} from "../../@types/components/inputs";
import { BaseDateInput } from "./BaseDateInput";

const DatePickerInput: React.FC<ComponentProps<DatePickerInputProps>> = ({
  changeState,
  classes,
  labelKey,
  forText,
  isRequired,
  disabled,
  errorMessage,
  onBlur,
  name,
  placeHolder,
  focusRingClassName,
  onChange,
  value
}) => {
  const isInvalid = changeState === InputChangeState.INVALID;
  const [selectedValue, setSelectedValue] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const handleSelectChange = (changeEvent: Event) => {
      return onChange
        ? onChange((changeEvent as any).detail, changeEvent)
        : null;
    };

    const handleBlur = (blurEvent: Event) => {
      return onBlur ? onBlur(blurEvent as any) : null;
    };

    inputRef.current?.addEventListener("change", handleSelectChange);
    inputRef.current?.addEventListener("blur", handleBlur);

    return () => {
      inputRef.current?.removeEventListener("change", handleSelectChange);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      inputRef.current?.removeEventListener("blur", handleBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Label = labelKey ? (
    <span
      className={`font-semibold text-[16px] md:text-base text-dark-1 mb-[12px] block font-NotoSans ${classes?.label}`}
    >
      {labelKey}
      {isRequired && <span className="text-red-600 ml-[4px]">*</span>}
    </span>
  ) : (
    <React.Fragment />
  );

  return (
    <div
      className={`rounded-[12px] relative ${classes?.container}`}
      item-state={changeState}
    >
      <input
        hidden
        type="text"
        placeholder={(placeHolder || labelKey) as any}
        value={selectedValue ? selectedValue.toISOString() : ""}
        name={name || forText}
        disabled={disabled}
        required={isRequired}
        ref={inputRef}
        id={forText}
        onChange={() => {}}
      />

      <BaseDateInput
        label={Label}
        value={selectedValue}
        classes={classes}
        required={isRequired}
        name={name || forText}
        validationStatese={isInvalid}
        focusRingClassName={focusRingClassName}
        onChange={(value: Date) => {
          setSelectedValue(value);
          if (inputRef.current) {
            inputRef.current.value = value?.toISOString();
            inputRef.current.id = forText;
          }
          inputRef.current?.dispatchEvent(
            new CustomEvent("blur", {
              bubbles: true,
              detail: value?.toISOString()
            })
          );
          inputRef.current?.dispatchEvent(
            new CustomEvent("change", {
              bubbles: true,
              detail: value?.toISOString()
            })
          );
        }}
      />
      {isInvalid && (
        <p className="text-red-400 p-0 text-sm font-light">{errorMessage}</p>
      )}
    </div>
  );
};

export default DatePickerInput;
