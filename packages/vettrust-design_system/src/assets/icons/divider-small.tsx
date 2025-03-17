// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const DividerSmall: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="48"
      height="4"
      viewBox="0 0 48 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="4" rx="2" fill="#D3A05C" />
    </svg>
  );
};

export default DividerSmall;
