// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const CheckboxUnchecked: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="3.5"
        stroke="currentColor"
      />
    </svg>
  );
};

export default CheckboxUnchecked;
