// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const OfficeBagPlain: React.FC<ComponentProps<{}>> = ({ className }) => {
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
        d="M9 4.25C9 3.42179 9.67179 2.75 10.5 2.75H13.5C14.3282 2.75 15 3.42179 15 4.25V5.75H20.25C21.4922 5.75 22.5 6.75779 22.5 8V18.5C22.5 19.7422 21.4922 20.75 20.25 20.75H3.75C2.50779 20.75 1.5 19.7422 1.5 18.5V8C1.5 6.75779 2.50779 5.75 3.75 5.75H9V4.25ZM13.5 5.75H10.5V4.25H13.5V5.75ZM7.5 8C7.5 7.58579 7.16421 7.25 6.75 7.25C6.33579 7.25 6 7.58579 6 8V17C6 17.4142 6.33579 17.75 6.75 17.75C7.16421 17.75 7.5 17.4142 7.5 17V8ZM18 8C18 7.58579 17.6642 7.25 17.25 7.25C16.8358 7.25 16.5 7.58579 16.5 8V17C16.5 17.4142 16.8358 17.75 17.25 17.75C17.6642 17.75 18 17.4142 18 17V8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default OfficeBagPlain;
