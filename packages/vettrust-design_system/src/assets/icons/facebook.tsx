// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const Facebook: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="18.75"
      height="18.75"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.625 2.625H3.375C2.96016 2.625 2.625 2.96016 2.625 3.375V20.625C2.625 21.0398 2.96016 21.375 3.375 21.375H20.625C21.0398 21.375 21.375 21.0398 21.375 20.625V3.375C21.375 2.96016 21.0398 2.625 20.625 2.625ZM19.875 19.875H15.5602V14.1141H17.9977L18.3633 11.2852H15.5602V9.47812C15.5602 8.65781 15.7875 8.1 16.9617 8.1H18.4594V5.56875C18.1992 5.53359 17.3109 5.45625 16.275 5.45625C14.1141 5.45625 12.6352 6.77578 12.6352 9.19687V11.2828H10.193V14.1117H12.6375V19.875H4.125V4.125H19.875V19.875Z"
        fill="#262626"
      />
    </svg>
  );
};

export default Facebook;
