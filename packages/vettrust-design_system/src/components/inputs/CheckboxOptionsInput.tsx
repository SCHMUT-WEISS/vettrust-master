/* eslint-disable jsx-a11y/no-noninteractive-tabindex,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,import/no-extraneous-dependencies,indent,react/no-unknown-property,no-unused-expressions */
import React, { ChangeEvent } from "react";
import {
  CheckboxOptionsInputProps,
  FormSelectOption
} from "../../@types/components/inputs";
import CheckboxInput from "./CheckboxInput";

const CheckboxOptionsInput = ({
  value,
  options,
  onChange,
  name,
  disabled
}: CheckboxOptionsInputProps) => {
  const currentValue = value ? value.split(",") : [];
  const changeHandler = (i: FormSelectOption) => (checked: boolean) => {
    const newValue =
      checked && !currentValue.includes(i.submitValue as string)
        ? [i.submitValue, ...currentValue]
        : currentValue.filter((v) => v !== i.submitValue);
    if (onChange)
      onChange({
        target: {
          id: name,
          name,
          value: newValue.join(",")
        }
      } as ChangeEvent<HTMLInputElement>);
  };
  return (
    <>
      {options.map((i) => (
        <div
          className="border-sand-pressed border rounded-[8px] px-[16px] group hover:cursor-pointer"
          key={Math.random()}
        >
          <CheckboxInput
            labelText={i.displayValue}
            labelClassName="text-darkBlue font-noto-sans-condensed font-semibold"
            className="flex-wrap cursor-pointer"
            value={currentValue.includes(i.submitValue as string)}
            onChange={changeHandler(i)}
            name={name}
            disabled={disabled}
          />
        </div>
      ))}
    </>
  );
};

export default CheckboxOptionsInput;
