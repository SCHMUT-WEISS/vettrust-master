// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const MapPin: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5049_20630)">
        <path
          d="M14 6.66797C14 11.3346 8 15.3346 8 15.3346C8 15.3346 2 11.3346 2 6.66797C2 5.07667 2.63214 3.55055 3.75736 2.42533C4.88258 1.30011 6.4087 0.667969 8 0.667969C9.5913 0.667969 11.1174 1.30011 12.2426 2.42533C13.3679 3.55055 14 5.07667 14 6.66797Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 8.66797C9.10457 8.66797 10 7.77254 10 6.66797C10 5.5634 9.10457 4.66797 8 4.66797C6.89543 4.66797 6 5.5634 6 6.66797C6 7.77254 6.89543 8.66797 8 8.66797Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5049_20630">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MapPin;
