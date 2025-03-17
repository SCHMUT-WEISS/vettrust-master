// eslint-disable
import React from "react";
import { ComponentProps } from "../../@types";

const CrossPrimaryGolden: React.FC<ComponentProps<{}>> = ({ className }) => {
  return (
    <svg
      className={className}
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="48" cy="48" r="48" fill="#132F55" />
      <path
        d="M52.0938 41.7812V43.2812H53.5938H65.875V52.0938H53.5938H52.0938V53.5938V65.875H43.2812V53.5938V52.0938H41.7812H29.5V43.2812H41.7812H43.2812V41.7812V29.5H52.0938V41.7812Z"
        stroke="#CBA166"
        strokeWidth="3"
      />
    </svg>
  );
};

export default CrossPrimaryGolden;
