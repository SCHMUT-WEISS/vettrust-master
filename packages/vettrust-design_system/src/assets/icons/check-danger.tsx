// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const CheckDanger: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#D52F89"
        stroke="#D52F89"
        strokeWidth="2"
      />
      <path
        d="M17 8.75L10.125 15.75L7 12.5682"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckDanger;
