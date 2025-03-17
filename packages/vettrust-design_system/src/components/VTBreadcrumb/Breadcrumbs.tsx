import React, { Children, Fragment, FC } from "react";
import { ComponentProps } from "../../@types";

const ChevronRight = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.75 9L7.75 6L4.75 3"
      stroke="#717E99"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Breadcrumbs: FC<ComponentProps<Record<string, any>>> = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const childrenWithSeparator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={Math.random()}>
          <li className="text-lightBlue-1.5 font-semibold text-[12px]">
            {child}
          </li>
          <ChevronRight />
        </Fragment>
      );
    }

    return (
      <li
        className="text-darkBlue font-semibold text-[12px]"
        key={Math.random()}
      >
        {child}
      </li>
    );
  });

  return (
    <nav className="">
      <ol className="flex flex-row items-center gap-[4px]">
        {childrenWithSeparator}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
