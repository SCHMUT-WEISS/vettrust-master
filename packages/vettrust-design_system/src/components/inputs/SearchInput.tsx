/* eslint-disable react/require-default-props,jsx-a11y/no-noninteractive-tabindex */
import React, { useRef } from "react";
import { Tooltip } from "@mui/material";
import { useFocus, useTextField } from "react-aria";
import {
  FormSearchInputProps,
  InputChangeState
} from "../../@types/components/inputs";
import Button from "../shared/Button";

const Search = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[16px] h-[16px]"
  >
    <path
      d="M14 13.9999L11.1 11.0999M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ExtendedFormInputProps extends FormSearchInputProps {
  router: any;
}

const SearchInput = ({
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
  onSearchClicked,
  style,
  tipText,
  router
}: ExtendedFormInputProps) => {
  const ref = useRef();
  const inputInternalRef = useRef<HTMLInputElement>();
  const isInvalid = changeState === InputChangeState.INVALID;
  const getInputClasses = () => {
    if (classes?.input) {
      return classes.input;
    }
    return `block ${isInvalid ? "border-red-400" : "border-dark-4"}`;
  };

  const [parentAdditionalClass, setParentAdditionalClass] = React.useState("");
  const [inputAdditionalClass, setInputAdditionalClass] = React.useState("");
  const [focussed, setFocussed] = React.useState(false);

  const { inputProps } = useTextField(
    {
      onBlur: (event) => {
        if (onBlur) {
          onBlur(event as any);
        }
        setParentAdditionalClass("");
        setInputAdditionalClass("");
        setFocussed(false);
      },
      id: forText,
      type: "text",
      isDisabled: disabled,
      isRequired: Boolean(isRequired),
      name: name || forText,
      onInput: (event) => {
        setParentAdditionalClass("bg-magenta/5 border-magenta border-[1px]");
        setInputAdditionalClass("bg-transparent");
        if (onChange) {
          onChange(event.currentTarget.value, event as any);
        }
      },
      "aria-label": forText
    },
    ref as any
  );

  const { focusProps } = useFocus({
    onFocusChange: (isFocused) => {
      if (isFocused) {
        setFocussed(true);
        // eslint-disable-next-line no-unused-expressions
        inputInternalRef.current?.focus();
      }
    }
  });

  return (
    <div
      className={`font-semibold bg-white rounded-[12px] relative ${classes?.container} ${parentAdditionalClass}`}
      style={style}
      tabIndex={0}
      {...focusProps}
    >
      <div
        className={`flex flex-row w-full h-[48px] pr-[8px] ${getInputClasses()}`}
      >
        {focussed && (
          <div className="absolute w-[calc(100%_+_8px)] h-[calc(100%_+_8px)] border border-[2px] border-magenta/50 z-[-1] left-[-4px] top-[-4px] rounded-[15px]">
            &nbsp;
          </div>
        )}
        <input
          ref={inputInternalRef}
          {...(inputProps as any)}
          type="text"
          id={forText}
          tabIndex={tabIndex}
          placeholder={placeHolder || labelKey}
          className={`outline-none flex-auto ml-[1px] pl-[16px] placeholder:font-[600] font-light ${classes?.input} ${inputAdditionalClass}`}
        />
        <span className="w-[40px] inline-flex items-center justify-center ">
          <Button
            type="PRIMARY"
            size="lg"
            className="sm:mr-0 sm:ml-0 h-[40px] w-[40px] rounded-[50%] p-0"
            onClick={onSearchClicked}
            router={router}
          >
            <Tooltip title={tipText as string} arrow placement="bottom-start">
              <span>
                <Search />
              </span>
            </Tooltip>
          </Button>
        </span>
      </div>
      {isInvalid && (
        <p className="text-red-400 p-0 text-sm font-light">{errorMessage}</p>
      )}
    </div>
  );
};

export default SearchInput;
