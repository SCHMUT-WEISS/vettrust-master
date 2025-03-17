import React, { ReactNode } from "react";
import { ComponentProps } from "../@types";

/* Parent of all components that are tight to the footer but a little elevated.
 * Check the last section of the home page */
const BottomFooterContainer: React.FC<ComponentProps> = ({ children }) => (
  <div className="relative -mb-10 mt-10">
    <div
      className="h-1/2 bg-darkBlue absolute top-1/2 inset-x-0"
      style={{ zIndex: -1 }}
    />
    <div className="container-wrapper min-h-[144px] pb-20">
      {children as ReactNode}
    </div>
  </div>
);

export default BottomFooterContainer;
