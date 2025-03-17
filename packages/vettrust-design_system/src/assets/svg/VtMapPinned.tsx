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
      width={32}
      height={33}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 31.0276C16 31.0276 28 22.9334 28 13.4903C28 10.2703 26.7357 7.1821 24.4853 4.90519C22.2348 2.62828 19.1826 1.34912 16 1.34912C12.8174 1.34912 9.76515 2.62828 7.51472 4.90519C5.26428 7.1821 4 10.2703 4 13.4903C4 22.9334 16 31.0276 16 31.0276ZM20 13.4903C20 15.7254 18.2091 17.5374 16 17.5374C13.7909 17.5374 12 15.7254 12 13.4903C12 11.2552 13.7909 9.44324 16 9.44324C18.2091 9.44324 20 11.2552 20 13.4903Z"
        fill="currentColor"
      />
    </svg>
  );
}
