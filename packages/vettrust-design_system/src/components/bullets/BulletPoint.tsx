import React from "react";
import { ComponentProps } from "../../@types";
import { CheckDanger } from "../../assets/icons";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BulletPoint: React.FC<ComponentProps<{}>> = ({ children, className }) => (
  <span className={`flex mt-[12px] lg:mt-[8px] ${className}`}>
    <CheckDanger className="mr-[8px] inline flex-wrap" />
    <span className="flex-1">{children}</span>
  </span>
);

export default BulletPoint;
