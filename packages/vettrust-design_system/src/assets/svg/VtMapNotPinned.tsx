/* eslint-disable react/require-default-props */
import React from "react";

export default function ({
  className,
  style
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={24}
      height={30}
      viewBox="0 0 24 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 29.972C12 29.972 24 21.972 24 12.6387C24 9.45607 22.7357 6.40383 20.4853 4.15339C18.2348 1.90295 15.1826 0.638672 12 0.638672C8.8174 0.638672 5.76515 1.90295 3.51472 4.15339C1.26428 6.40383 0 9.45607 0 12.6387C0 21.972 12 29.972 12 29.972ZM16 12.6387C16 14.8478 14.2091 16.6387 12 16.6387C9.79086 16.6387 8 14.8478 8 12.6387C8 10.4295 9.79086 8.63867 12 8.63867C14.2091 8.63867 16 10.4295 16 12.6387Z"
        fill="#132F55"
      />
    </svg>
  );
}
