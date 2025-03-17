/* eslint-disable no-use-before-define,security/detect-object-injection */
import React from "react";
import { ComponentProps } from "../../@types";
import { QuotePlain } from "../../assets/icons";

const Quote: React.FC<ComponentProps<QuoteProps>> = ({
  children,
  className,
  quoteIconClassName
}) => (
  <div className={`md:flex flex-row gap-[8px] ${className}`}>
    <span>
      <QuotePlain className={`text-magenta ${quoteIconClassName}`} />
    </span>
    {children}
  </div>
);

export interface QuoteProps {
  className?: string;
  quoteIconClassName?: string;
}

export default Quote;
