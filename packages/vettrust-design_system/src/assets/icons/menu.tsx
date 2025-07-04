// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Menu: React.FC<ComponentProps<{}>> = ({ className }) => {
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
        d="M1.89014 7.66797H13.8901M1.89014 3.66797H13.8901M1.89014 11.668H13.8901"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Menu;
