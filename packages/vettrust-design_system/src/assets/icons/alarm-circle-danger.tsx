// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const AlarmCircleDanger: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.9998"
        cy="16"
        r="13.3333"
        fill="#D52F89"
        stroke="#D52F89"
        strokeWidth="2"
      />
      <path
        d="M16 10.6667V16M16 21.3334H16.0133"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AlarmCircleDanger;
