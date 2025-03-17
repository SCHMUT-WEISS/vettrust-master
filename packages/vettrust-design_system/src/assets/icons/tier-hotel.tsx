// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const TierHotel: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 2.83301C6 2.28087 6.44786 1.83301 7 1.83301H9C9.55214 1.83301 10 2.28087 10 2.83301V3.83301H13.5C14.3281 3.83301 15 4.50487 15 5.33301V12.333C15 13.1612 14.3281 13.833 13.5 13.833H2.5C1.67186 13.833 1 13.1612 1 12.333V5.33301C1 4.50487 1.67186 3.83301 2.5 3.83301H6V2.83301ZM9 3.83301H7V2.83301H9V3.83301ZM5 5.33301C5 5.05687 4.77614 4.83301 4.5 4.83301C4.22386 4.83301 4 5.05687 4 5.33301V11.333C4 11.6091 4.22386 11.833 4.5 11.833C4.77614 11.833 5 11.6091 5 11.333V5.33301ZM12 5.33301C12 5.05687 11.7761 4.83301 11.5 4.83301C11.2239 4.83301 11 5.05687 11 5.33301V11.333C11 11.6091 11.2239 11.833 11.5 11.833C11.7761 11.833 12 11.6091 12 11.333V5.33301Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TierHotel;
