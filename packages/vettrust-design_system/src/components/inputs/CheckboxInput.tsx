/* eslint-disable react/require-default-props,react/jsx-curly-newline */
import React, { ReactNode } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { clsx } from "clsx";
import {
  CheckboxChecked,
  CheckboxUnchecked,
  RadioChecked,
  RadioUnchecked
} from "../../assets/icons";

interface CheckBoxInputProps {
  labelText: string | ReactNode;
  isRequired?: boolean;
  className?: string;
  onChange?: (
    value: boolean,
    event?: Event | React.ChangeEvent<HTMLInputElement>
  ) => void;
  value?: boolean;
  name?: string;
  disabled?: boolean;
  isRadioButton?: boolean;
  labelClassName?: string;
}

export default function CheckboxInput({
  labelText,
  isRequired,
  className,
  onChange,
  value,
  name,
  disabled,
  isRadioButton,
  labelClassName
}: CheckBoxInputProps) {
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
          <Checkbox
            disableRipple
            onFocusVisible={() => {
              setFocusVisible(true);
            }}
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
            onChange={(changeEvent) =>
              onChange
                ? onChange(changeEvent.target.checked, changeEvent)
                : null
            }
            checked={value}
            name={name}
            disabled={disabled}
            color="primary"
            style={{
              margin: "-10px 0 -10px -10px"
            }}
            size="small"
            onBlur={() => {
              setFocusVisible(false);
            }}
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
