// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Horse: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="26"
      height="28"
      viewBox="0 0 26 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.04004 12.32C1.04004 13.46 2.42004 16.88 2.42004 16.88L2.12004 19.7L3.62004 25.94C3.74004 26.36 4.04004 26.6 4.46004 26.6H5.84004L4.40004 20.12C4.40004 20.12 5.78004 18.68 6.74004 16.28C6.74004 16.28 9.32004 18.2 15.08 16.88L16.34 25.64C16.34 26.12 16.7 26.54 17.18 26.54H18.2C18.2 26.54 17.84 16.94 17.66 15.8C19.76 13.22 18.32 8.48 19.58 7.52C19.88 8.72 21.26 9.2 22.22 9.02C23.18 8.84 24.38 9.5 24.38 9.5L25.04 8.84C25.34 8.54 25.34 8 25.1 7.7L21.92 4.04L23.12 2.54C14.36 -2.02 12.62 8.42 12.62 8.42C12.62 8.42 11.66 8.9 9.86004 8.9C8.06004 8.9 7.16004 8.24 4.82004 8.24C2.30004 8.24 1.04004 9.74 1.04004 12.32Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Horse;
