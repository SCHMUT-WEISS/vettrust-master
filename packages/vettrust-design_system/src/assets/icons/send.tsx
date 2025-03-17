// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Send: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5049_21441)">
        <path
          d="M14.6668 1.33203L7.3335 8.66536M14.6668 1.33203L10.0002 14.6654L7.3335 8.66536M14.6668 1.33203L1.3335 5.9987L7.3335 8.66536"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5049_21441">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Send;
