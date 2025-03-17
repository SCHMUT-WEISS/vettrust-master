// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const CrossCircledSmall: React.FC<ComponentProps<{}>> = ({ className }) => {
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
        d="M12.0002 18.6666C15.6821 18.6666 18.6668 15.6818 18.6668 11.9999C18.6668 8.31802 15.6821 5.33325 12.0002 5.33325C8.31826 5.33325 5.3335 8.31802 5.3335 11.9999C5.3335 15.6818 8.31826 18.6666 12.0002 18.6666Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.33325V14.6666"
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

export default CrossCircledSmall;
