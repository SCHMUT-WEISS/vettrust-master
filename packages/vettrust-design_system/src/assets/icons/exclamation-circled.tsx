// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const ExclamationCircled: React.FC<ComponentProps<{}>> = ({ className }) => {
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
        d="M7.77794 12.4436C10.2325 12.4436 12.2224 10.4537 12.2224 7.99913C12.2224 5.54453 10.2325 3.55469 7.77794 3.55469C5.32334 3.55469 3.3335 5.54453 3.3335 7.99913C3.3335 10.4537 5.32334 12.4436 7.77794 12.4436Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.77783 9.77778V8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.77783 6.22266H7.78228"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExclamationCircled;
