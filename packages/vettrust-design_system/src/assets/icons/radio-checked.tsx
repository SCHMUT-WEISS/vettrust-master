// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const RadioChecked: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="4" fill="#D52F89" />
      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#D52F89" />
    </svg>
  );
};

export default RadioChecked;
