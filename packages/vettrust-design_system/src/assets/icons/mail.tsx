// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Mail: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.66634 2.66602H13.333C14.0663 2.66602 14.6663 3.26602 14.6663 3.99935V11.9993C14.6663 12.7327 14.0663 13.3327 13.333 13.3327H2.66634C1.93301 13.3327 1.33301 12.7327 1.33301 11.9993V3.99935C1.33301 3.26602 1.93301 2.66602 2.66634 2.66602Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6663 4L7.99967 8.66667L1.33301 4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Mail;
