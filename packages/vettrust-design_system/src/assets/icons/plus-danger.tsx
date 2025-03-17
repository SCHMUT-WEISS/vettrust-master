// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const PlusDanger: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_7830_17133)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.833496 8.00016C0.833496 4.04212 4.04212 0.833496 8.00016 0.833496C11.9582 0.833496 15.1668 4.04212 15.1668 8.00016C15.1668 11.9582 11.9582 15.1668 8.00016 15.1668C4.04212 15.1668 0.833496 11.9582 0.833496 8.00016Z"
          fill="#D52F89"
        />
        <path
          d="M8.00016 5.3335V10.6668M5.3335 8.00016H10.6668"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_7830_17133">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlusDanger;
