import React from "react";

// eslint-disable-next-line react/require-default-props
const MapsCompassIcon = ({ className = "" }: { className?: string }) => {
  return (
    <span
      className={`${className} absolute right-0 top-0 h-full flex flex-col justify-center px-[16px]`}
    >
      <span className="flex-auto">&nbsp;</span>
      <span className="h-[48px] flex flex-col justify-center group-hover:text-magenta">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <g clipPath="url(#clip0_6857_20278)">
            <path
              d="M7.99967 14.6663C11.6816 14.6663 14.6663 11.6816 14.6663 7.99967C14.6663 4.31778 11.6816 1.33301 7.99967 1.33301C4.31778 1.33301 1.33301 4.31778 1.33301 7.99967C1.33301 11.6816 4.31778 14.6663 7.99967 14.6663Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8263 5.17301L9.41301 9.41301L5.17301 10.8263L6.58634 6.58634L10.8263 5.17301Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_6857_20278">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </span>
    </span>
  );
};

export default MapsCompassIcon;
