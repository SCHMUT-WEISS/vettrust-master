/* eslint-disable no-use-before-define,indent */
import React from "react";
import { ComponentProps } from "../../@types";
import Heading, { HeadingProps } from "./Heading";
import { DividerSmall, Divider } from "../../assets/icons";

const Section: React.FC<ComponentProps<SectionProps>> = ({
  children,
  title,
  className,
  divider = true,
  dividerClassName,
  style,
  childrenContainerClassname,
  dividerSmallClassName,
  id,
}) => (
  <div className={`text-darkBlue ${className}`} style={style} id={id}>
    {!title?.text === false &&  <Heading {...title} />}
    {divider === true && <Divider className={`mt-[16px] ${children ? "mb-[24px]" : ""} ${dividerClassName} hidden lg:block`} />}
    {divider === true &&<DividerSmall className={`mt-[16px] ${ children ? "mb-[24px]" : ""} ${dividerSmallClassName} block lg:hidden`} />}
    <div className={childrenContainerClassname}>{children}</div>
  </div>
);

export interface SectionProps {
  title: HeadingProps;
  divider?: boolean;
  backgroundColor?: string;
  dividerClassName?: string;
  dividerSmallClassName?: string;
  style?: React.CSSProperties;
  childrenContainerClassname?: string;
}

export default Section;
