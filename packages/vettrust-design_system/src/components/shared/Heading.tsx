/* eslint-disable react/require-default-props,no-use-before-define */
import React from "react";

const headingStyles = {
  h1: "H1",
  h2: "H2",
  h3: "H3",
  h4: "H4",
  h5: "H5",
  h6: "H6",
};

const Heading: React.FC<HeadingProps> = ({ level, text, className }) =>
  React.createElement(
    level,
    {
      type: level || "h1",
      className: [headingStyles[`${level}`], className].join(" "),
    },
    text
  );

export interface HeadingProps {
  className?: string;
  text: string | React.ReactNode;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default Heading;
