// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Clipboard: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1665 2.66536H12.4998C12.8535 2.66536 13.1926 2.80584 13.4426 3.05589C13.6927 3.30594 13.8332 3.64508 13.8332 3.9987V13.332C13.8332 13.6857 13.6927 14.0248 13.4426 14.2748C13.1926 14.5249 12.8535 14.6654 12.4998 14.6654H4.49984C4.14622 14.6654 3.80708 14.5249 3.55703 14.2748C3.30698 14.0248 3.1665 13.6857 3.1665 13.332V3.9987C3.1665 3.64508 3.30698 3.30594 3.55703 3.05589C3.80708 2.80584 4.14622 2.66536 4.49984 2.66536H5.83317M6.49984 1.33203H10.4998C10.868 1.33203 11.1665 1.63051 11.1665 1.9987V3.33203C11.1665 3.70022 10.868 3.9987 10.4998 3.9987H6.49984C6.13165 3.9987 5.83317 3.70022 5.83317 3.33203V1.9987C5.83317 1.63051 6.13165 1.33203 6.49984 1.33203Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Clipboard;
