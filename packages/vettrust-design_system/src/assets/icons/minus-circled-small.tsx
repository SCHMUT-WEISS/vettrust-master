// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const MinusCircledSmall: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0002 18.6667C15.6821 18.6667 18.6668 15.6819 18.6668 12C18.6668 8.31811 15.6821 5.33334 12.0002 5.33334C8.31826 5.33334 5.3335 8.31811 5.3335 12C5.3335 15.6819 8.31826 18.6667 12.0002 18.6667Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.3335 12H14.6668"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MinusCircledSmall;
