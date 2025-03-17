// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const ExternalLinkDanger: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_7532_25932)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.833008 8.00016C0.833008 4.04212 4.04163 0.833496 7.99967 0.833496C11.9577 0.833496 15.1663 4.04212 15.1663 8.00016C15.1663 11.9582 11.9577 15.1668 7.99967 15.1668C4.04163 15.1668 0.833008 11.9582 0.833008 8.00016Z"
          fill="#D52F89"
        />
        <path
          d="M5.69043 10.4045L10.4045 5.69043M10.4045 5.69043H5.69043M10.4045 5.69043V10.4045"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_7532_25932">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ExternalLinkDanger;
