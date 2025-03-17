// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const ArrowLeft: React.FC<ComponentProps<{}>> = ({ className }) => {
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
        d="M12.6665 7.99935L3.33317 7.99935M3.33317 7.99935L7.99984 12.666M3.33317 7.99935L7.99984 3.33268"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;
