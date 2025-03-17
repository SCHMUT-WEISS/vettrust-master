// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Refresh: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4V10M1 10H7M1 10L5.64 5.64C6.71475 4.56471 8.04437 3.77921 9.50481 3.35677C10.9652 2.93434 12.5089 2.88875 13.9917 3.22426C15.4745 3.55976 16.8482 4.26543 17.9845 5.27542C19.1209 6.2854 19.9828 7.56678 20.49 9M23 20V14M23 14H17M23 14L18.36 18.36C17.2853 19.4353 15.9556 20.2208 14.4952 20.6432C13.0348 21.0657 11.4911 21.1112 10.0083 20.7757C8.52547 20.4402 7.1518 19.7346 6.01547 18.7246C4.87913 17.7146 4.01717 16.4332 3.51 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Refresh;
