// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const ChevronDownDanger: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
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
        d="M6 9.75L12 15.75L18 9.75"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronDownDanger;
