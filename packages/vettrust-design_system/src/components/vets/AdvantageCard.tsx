/* eslint-disable react/require-default-props */
import React from "react";
import { ComponentProps } from "../../@types";
import Heading from "../shared/Heading";

const AdvantageIconDesktop = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.58331 15.9993C2.58331 8.22134 8.88864 1.91602 16.6666 1.91602C24.4447 1.91602 30.75 8.22134 30.75 15.9993C30.75 23.7774 24.4447 30.0827 16.6666 30.0827C8.88864 30.0827 2.58331 23.7774 2.58331 15.9993Z"
        fill="#D52F89"
      />
      <path
        d="M23.3333 11.666L14.1666 20.9993L9.99994 16.7569"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const AdvantageIconMobile = ({ className }: { className?: string }) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
        fill="#D52F89"
      />
      <path
        d="M17 8.75L10.125 15.75L7 12.5682"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface AdvantageCardProps {
  text: string | React.ReactNode;
}

const AdvantageCard: React.FC<ComponentProps<AdvantageCardProps>> = ({
  text,
  className,
}) => (
  <div
    className={`flex p-[20px] lg:p-[24px] bg-white rounded-[12px] ${className}`}
  >
    <span className="mr-[8px] lg:mr-[16px]">
      <AdvantageIconMobile className="lg:hidden" />
      <AdvantageIconDesktop className="hidden lg:block" />
    </span>
    <Heading level="h4" text={text} className="hidden lg:block" />
    <Heading level="h5" text={text} className="lg:hidden" />
  </div>
);

export default AdvantageCard;
