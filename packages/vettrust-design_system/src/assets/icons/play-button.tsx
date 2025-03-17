// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const PlayButton: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="42"
      height="52"
      viewBox="0 0 42 52"
      fill="none"
    >
      <path
        d="M2.33331 2L39.6667 26L2.33331 50V2Z"
        fill="white"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlayButton;
