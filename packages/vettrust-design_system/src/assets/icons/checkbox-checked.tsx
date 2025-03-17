// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const CheckboxChecked: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" rx="4" fill="currentColor" />
      <path
        d="M11.5556 5.33337L6.66668 10.2223L4.44446 8.00004"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckboxChecked;
