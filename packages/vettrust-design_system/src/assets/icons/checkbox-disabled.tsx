// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const CheckboxDisabled: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="#ECE3D6" />
      <path
        d="M11.5556 5.33331L6.66668 10.2222L4.44446 7.99998"
        stroke="#D9CEBF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#D9CEBF" />
    </svg>
  );
};

export default CheckboxDisabled;
