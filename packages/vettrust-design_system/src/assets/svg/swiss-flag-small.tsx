/* eslint-disable react/require-default-props */
import React from "react";

// eslint-disable-next-line react/require-default-props
export default function ({
  className,
  style
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={32}
      height={47}
      viewBox="0 0 32 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <rect width={32} height="46.5429" fill="#FF0000" />
      <g clipPath="url(#clip0_4474_11441)">
        <path d="M2.74219 17H29.2565V43.5143H2.74219V17Z" fill="#FF0000" />
        <path
          d="M13.5134 21.9707H18.4848V27.7707H24.2848V32.7421H18.4848V38.5421H13.5134V32.7421H7.71338V27.7707H13.5134V21.9707Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_4474_11441">
          <rect
            x="2.74219"
            y={17}
            width="26.5143"
            height="26.5143"
            rx={8}
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
