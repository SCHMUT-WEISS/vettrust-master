// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const InactiveCarouselDot: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="7" r="6.25" stroke="#132F55" strokeWidth="2" />
    </svg>
  );
};

export default InactiveCarouselDot;
