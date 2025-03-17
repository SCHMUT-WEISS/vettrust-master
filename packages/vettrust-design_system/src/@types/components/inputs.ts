import React, { ChangeEvent, ReactNode } from "react";
import { SelectChangeEvent } from "@mui/material";
import { UseVtTranslateType, VTTranslateFx } from "../index";

/* States that are used to decide weather or not an input should show an error message */
export enum InputChangeState {
  VALID = "VALID",
  INVALID = "INVALID",
  UNTOUCHED = "UNTOUCHED",
  TOUCHED = "TOUCHED"
}

/* Props of an input with type="text" */
export interface FormTextInputProps {
  /* This is the label to display above the input. Leave it blank if not needed */
  labelKey?: string | ReactNode;
  /* Wil be used as htmlfor of the label as well as the id of the actual input */
  forText: string;
  isRequired?: boolean;
  classes?: {
    input?: string;
    container?: string;
    label?: string;
  };
  tabIndex?: number;
  type?: string;
  placeHolder?: string | ReactNode;
  onChange?: (
    value: string,
    event?: Event | React.ChangeEvent<HTMLInputElement>
  ) => void;
  value?: string;
  changeState?: InputChangeState;
  errorMessage?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  min?: number;
  disabled?: boolean;
  name?: string;
  isLoading?: boolean;
  focusRingClassName?: string;
}

/* Props of a search input */
export interface FormSearchInputProps extends FormTextInputProps {
  onSearchClicked: (data?: any) => void;
  style?: React.CSSProperties;
  tipText: string;
  autoFocus?: boolean;
}

/* Props of a custom option element for a select dropdown */
export interface FormSelectOption {
  submitValue: string;
  displayValue: string | ReactNode;
}

/* Props of a select dropdown */
export interface FormSelectInputProps extends FormTextInputProps {
  useVtTranslate: UseVtTranslateType;
  style?: React.CSSProperties;
  /* An array of key-value pairs to use to populate <Option /> elements of the input */
  options: FormSelectOption[];
  /* This is the value of the select box */
  selected?: FormSelectOption;
  onSelectedChange?: (
    selected: FormSelectOption,
    event?: Event | SelectChangeEvent<FormSelectOption>
  ) => void;
  defaultValue?: FormSelectOption;
  onClick?: () => void;
  focusRingClassName?: string;
  defaultLabel?: string | ReactNode;
}

export interface DatePickerInputProps extends FormTextInputProps {
  exclamationCircled?: React.ReactNode;
  focusRingClassName?: string;
}

export interface RadioOptionsInputProps {
  value?: string;
  options: FormSelectOption[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxOptionsInputProps {
  value?: string;
  options: FormSelectOption[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  disabled?: boolean;
}

export interface StepDepartmentProps {
  t: VTTranslateFx;
  isSubmitting: boolean;
  touched: any;
  errors: any;
  values: any;
  handleChange: (
    event: ChangeEvent<HTMLInputElement> | Event | undefined
  ) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  useVtTranslate: UseVtTranslateType;
  setFiles: (files: any) => void;
  currentFiles: Record<string, File[]>;
}

export interface StepBasicnProps {
  t: VTTranslateFx;
  isSubmitting: boolean;
  touched: any;
  errors: any;
  values: any;
  handleChange: (
    event: ChangeEvent<HTMLInputElement> | Event | undefined
  ) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}
