// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const InactiveCarouselDotSmall: React.FC<ComponentProps<{}>> = ({
  className
}) => {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5" cy="5" r="4.25" stroke="#132F55" strokeWidth="2" />
    </svg>
  );
};

export default InactiveCarouselDotSmall;
