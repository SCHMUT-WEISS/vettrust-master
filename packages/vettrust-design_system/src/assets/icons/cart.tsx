// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Cart: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5226_10316)">
        <path
          d="M0.666504 0.666016H3.33317L5.11984 9.59268C5.1808 9.89961 5.34778 10.1753 5.59153 10.3715C5.83529 10.5678 6.1403 10.672 6.45317 10.666H12.9332C13.246 10.672 13.551 10.5678 13.7948 10.3715C14.0386 10.1753 14.2055 9.89961 14.2665 9.59268L15.3332 3.99935H3.99984M6.6665 13.9993C6.6665 14.3675 6.36803 14.666 5.99984 14.666C5.63165 14.666 5.33317 14.3675 5.33317 13.9993C5.33317 13.6312 5.63165 13.3327 5.99984 13.3327C6.36803 13.3327 6.6665 13.6312 6.6665 13.9993ZM13.9998 13.9993C13.9998 14.3675 13.7014 14.666 13.3332 14.666C12.965 14.666 12.6665 14.3675 12.6665 13.9993C12.6665 13.6312 12.965 13.3327 13.3332 13.3327C13.7014 13.3327 13.9998 13.6312 13.9998 13.9993Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5226_10316">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Cart;
