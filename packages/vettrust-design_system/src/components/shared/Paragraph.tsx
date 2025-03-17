/* eslint-disable no-use-before-define,security/detect-object-injection,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from "react";
import { ComponentProps } from "../../@types";

export const PARAGRAPH_STYLES = Object.freeze({
  body_1: "text-[18px] leading-[28px]",
  body_2: "text-[16px] leading-[24px]",
  body_3: "text-[14px] leading-[20px]",
  label: "text-[16px] leading-[24px] font-semibold",
  caption: "text-[12px] leading-[20px]",
});

const Paragraph: React.FC<ComponentProps<ParagraphProps>> = ({
  type,
  children,
  className,
  style,
  onClick,
}) => (
  <div
    className={`${PARAGRAPH_STYLES[type]} ${className}`}
    itemType={type}
    style={style}
    onClick={onClick}
  >
    {children}
  </div>
);

export interface ParagraphProps {
  type: keyof typeof PARAGRAPH_STYLES;
  className?: string;
  style?: React.CSSProperties;
  // This is a workaround due to time constraints
  onClick?: () => void;
}

export default Paragraph;
