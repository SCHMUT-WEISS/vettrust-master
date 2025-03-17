/* eslint-disable jsx-a11y/no-noninteractive-tabindex,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,indent,react/no-unknown-property,no-unused-expressions */
import React, { useLayoutEffect, useRef } from "react";
import { Item } from "react-stately";
import { ComponentProps } from "../../@types";
import {
  FormSelectInputProps,
  FormSelectOption,
  InputChangeState
} from "../../@types/components/inputs";
import { ReactAriaSelect } from "./ReactAriaSelect";

const SelectInput: React.FC<ComponentProps<FormSelectInputProps>> = ({
  changeState,
  classes,
  labelKey,
  forText,
  isRequired,
  disabled,
  onSelectedChange,
  options,
  errorMessage,
  onBlur,
  name,
  placeHolder,
  selected,
  focusRingClassName,
  defaultLabel,
  useVtTranslate
}) => {
  const isInvalid = changeState === InputChangeState.INVALID;
  const [selectedValue, setSelectedValue] = React.useState(selected);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const handleSelectChange = (changeEvent: Event) => {
      return onSelectedChange
        ? onSelectedChange(
            (changeEvent as any).detail as FormSelectOption,
            changeEvent
          )
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
        placeholder={(placeHolder || labelKey) as string}
        value={selectedValue?.submitValue}
        name={name || forText}
        disabled={disabled}
        required={isRequired}
        ref={inputRef}
        id={forText}
      />
      <ReactAriaSelect
        useVtTranslate={useVtTranslate}
        isRequired={isRequired}
        className={`w-full input__select--parent ${classes?.input}`}
        focusRingClassName={focusRingClassName}
        label={Label}
        selectedKey={selectedValue?.submitValue}
        onSelectionChange={(value) => {
          const selectedOption = {
            submitValue: value as string,
            displayValue: options.find((el) => el.submitValue === value)
              ?.displayValue
          };

          setSelectedValue(selectedOption);

          if (inputRef.current) {
            inputRef.current.value = selectedOption.submitValue;
            inputRef.current.id = forText;
          }
          inputRef.current?.dispatchEvent(
            new CustomEvent("blur", {
              bubbles: true,
              detail: selectedOption
            })
          );
          inputRef.current?.dispatchEvent(
            new CustomEvent("change", {
              bubbles: true,
              detail: selectedOption
            })
          );
        }}
        defaultLabel={defaultLabel}
      >
        {options.map((option) => (
          <Item key={option.submitValue} >{option.displayValue}</Item>
        ))}
      </ReactAriaSelect>
      {isInvalid && (
        <p className="text-red-400 p-0 text-sm font-light">{errorMessage}</p>
      )}
    </div>
  );
};

export default SelectInput;
