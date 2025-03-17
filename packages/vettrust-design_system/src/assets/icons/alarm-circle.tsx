// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const AlarmCircle: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 18.6666C15.3486 18.6666 18.3333 15.6818 18.3333 11.9999C18.3333 8.31802 15.3486 5.33325 11.6667 5.33325C7.98477 5.33325 5 8.31802 5 11.9999C5 15.6818 7.98477 18.6666 11.6667 18.6666Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6665 14.6667V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6665 9.33325H11.6732"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AlarmCircle;
