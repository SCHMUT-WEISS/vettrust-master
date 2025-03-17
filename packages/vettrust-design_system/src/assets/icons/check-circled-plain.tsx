// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const CheckCircledPlain: React.FC<ComponentProps<{}>> = ({ className }) => {
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
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.5351 9.27553C17.8253 8.98001 17.8211 8.50516 17.5255 8.21491C17.23 7.92467 16.7552 7.92895 16.4649 8.22447L10.125 14.6797L7.53509 12.0427C7.24484 11.7471 6.76999 11.7429 6.47447 12.0331C6.17895 12.3233 6.17467 12.7982 6.46491 13.0937L9.58991 16.2755C9.73093 16.4191 9.92375 16.5 10.125 16.5C10.3263 16.5 10.5191 16.4191 10.6601 16.2755L17.5351 9.27553Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckCircledPlain;
