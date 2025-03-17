// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const ChevronDown: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 9.5L12 15.5L18 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
};

export default ChevronDown;
