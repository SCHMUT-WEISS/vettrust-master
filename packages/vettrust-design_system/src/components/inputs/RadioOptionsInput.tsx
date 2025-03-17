/* eslint-disable jsx-a11y/no-noninteractive-tabindex,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,import/no-extraneous-dependencies,indent,react/no-unknown-property,no-unused-expressions */
import React from "react";
import { RadioOptionsInputProps } from "../../@types/components/inputs";
import RadioInput from "./RadioInput";

const RadioOptionsInput = ({
  value,
  options,
  onChange
}: RadioOptionsInputProps) => {
  return (
    <>
      {options.map((i) => (
        <div
          className="border-sand-pressed border rounded-[8px] px-[16px] group hover:cursor-pointer"
          key={Math.random()}
        >
          <RadioInput
            labelText={i.displayValue}
            isRadioButton
            labelClassName="text-darkBlue font-noto-sans-condensed font-semibold"
            className="flex-wrap cursor-pointer"
            value={i.submitValue}
            checked={value === i.submitValue}
            onChange={onChange}
          />
        </div>
      ))}
    </>
  );
};

export default RadioOptionsInput;
