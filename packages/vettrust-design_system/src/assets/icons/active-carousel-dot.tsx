// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const ActiveCarouselDot: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill="#D52F89" />
    </svg>
  );
};

export default ActiveCarouselDot;
