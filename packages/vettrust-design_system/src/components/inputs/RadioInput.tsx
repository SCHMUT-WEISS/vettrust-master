/* eslint-disable react/require-default-props,react/jsx-curly-newline */
import React, { ReactNode } from "react";
import { Radio } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { clsx } from "clsx";
import {
  CheckboxChecked,
  CheckboxUnchecked,
  RadioChecked,
  RadioUnchecked
} from "../../assets/icons";

interface RadioInputProps {
  labelText: string | ReactNode;
  isRequired?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | boolean;
  disabled?: boolean;
  isRadioButton?: boolean;
  labelClassName?: string;
  checked?: boolean;
}

export default function RadioInput({
  labelText,
  isRequired,
  className,
  onChange,
  value,
  checked,
  disabled,
  isRadioButton,
  labelClassName
}: RadioInputProps) {
  const [focusVisible, setFocusVisible] = React.useState(false);

  return (
    <div className={` ${className} relative`}>
      {focusVisible && (
        <div
          className={`absolute w-[calc(100%_+_16px)] h-[41px] border-[2px] border-magenta/50 left-[-14px] rounded-[15px] top-[2px] ${clsx(
            { "cursor-no-drop": disabled }
          )}`}
        >
          &nbsp;
        </div>
      )}
      <FormControlLabel
        control={
          <Radio
            icon={isRadioButton ? <RadioUnchecked /> : <CheckboxUnchecked />}
            checkedIcon={
              isRadioButton ? (
                <RadioChecked className={value ? "text-magenta" : ""} />
              ) : (
                <CheckboxChecked className={value ? "text-magenta" : ""} />
              )
            }
            className={`mr-2 ${disabled && "mu-checkbox-not-allowed"}`}
            required={isRequired}
            onChange={onChange}
            disabled={disabled}
            color="primary"
            style={{
              margin: "-10px 0 -10px -10px"
            }}
            size="small"
            onFocusVisible={() => setFocusVisible(true)}
            onBlur={() => setFocusVisible(false)}
            value={value}
            checked={checked}
          />
        }
        label={
          <span className={labelClassName}>
            {labelText}
            {isRequired && <span className="text-red-600 ml-[4px]">*</span>}
          </span>
        }
        sx={{
          padding: "10px",
          "&:hover": {
            color: value ? "#990C58" : "#D52F89",
            backgroundColor: "transparent"
          },
          "&:focus-visible": {
            backgroundColor: "transparent"
          }
        }}
        className={`custom-mui-controlled-label ${clsx({
          "cursor-no-drop": disabled
        })}`}
      />
    </div>
  );
}
