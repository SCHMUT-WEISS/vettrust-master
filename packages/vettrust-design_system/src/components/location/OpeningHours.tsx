/* eslint-disable no-use-before-define,camelcase */
import React from "react";
import { OpeningPeriod, PlaceData } from "@googlemaps/google-maps-services-js";
import { ComponentProps, UseVtTranslateType } from "../../@types";
import { OpeningHoursSummary } from "../../shared/utils/elements/openingHours";
import Paragraph from "../shared/Paragraph";

const ClockIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_5613_17650)">
      <path
        d="M6.99984 12.8337C10.2215 12.8337 12.8332 10.222 12.8332 7.00033C12.8332 3.77866 10.2215 1.16699 6.99984 1.16699C3.77818 1.16699 1.1665 3.77866 1.1665 7.00033C1.1665 10.222 3.77818 12.8337 6.99984 12.8337Z"
        stroke="#132F55"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 3.5V7L9.33333 8.16667"
        stroke="#132F55"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_5613_17650">
        <rect width={14} height={14} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const OpeningHours: React.FC<ComponentProps<OpeningHoursProps>> = ({
  className,
  placesData,
  summaryClassName,
  useVtTranslate
}) => {
  return placesData?.opening_hours ? (
    <Paragraph
      type="body_2"
      className={`flex flex-row items-center gap-[8px] ${className}`}
    >
      <ClockIcon />{" "}
      <OpeningHoursSummary
        periods={placesData?.opening_hours?.periods as OpeningPeriod[]}
        className={summaryClassName}
        useVtTranslate={useVtTranslate}
      />
    </Paragraph>
  ) : null;
};

interface OpeningHoursProps {
  placesData: Partial<PlaceData>;
  summaryClassName?: string;
  useVtTranslate: UseVtTranslateType;
}

export default OpeningHours;
