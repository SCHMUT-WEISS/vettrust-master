// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Dot: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2" cy="2" r="2" fill="currentColor" />
    </svg>
  );
};

export default Dot;
