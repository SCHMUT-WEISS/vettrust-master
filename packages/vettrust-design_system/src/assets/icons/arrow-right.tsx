// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const ArrowRight: React.FC<ComponentProps<{}>> = ({ className }) => {
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
        d="M3.3335 7.9987H12.6668M12.6668 7.9987L8.00016 3.33203M12.6668 7.9987L8.00016 12.6654"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
