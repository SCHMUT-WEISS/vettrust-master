/* eslint-disable no-use-before-define,security/detect-object-injection */
import React from "react";
import { ComponentProps } from "../../@types";

// const TOTAL_SPACE = 16;
const SIZES = [16, 14, 10];

const Dot: React.FC<ComponentProps<DotsProps>> = ({
  active,
  activeDotColor,
  dotColor,
  children,
  distance,
}) => {
  const size = SIZES[distance] || 0;

  return (
    <div
      style={{
        width: size,
        height: size,
        background: active ? activeDotColor : dotColor,
        borderRadius: "50%",
        transition:
          "width 300ms ease-in-out, height 300ms ease-in-out, margin 300ms ease-in-out, background 300ms ease-in-out",
        boxShadow: "none",
        borderWidth: size !== 0 ? 1.5 : 0,
        borderStyle: "solid",
        borderColor: active ? activeDotColor : "#132F55",
        marginRight: size !== 0 ? 8 : 0,
      }}
    >
      {children}
    </div>
  );
};

interface DotsProps {
  active: boolean;
  activeDotColor: string;
  dotColor: string;
  distance: number;
}

export default Dot;
