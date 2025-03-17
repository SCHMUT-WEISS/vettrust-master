/* eslint-disable no-use-before-define,sonarjs/cognitive-complexity,security/detect-object-injection */
import React, { RefObject, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { FocusRing, useButton } from "react-aria";
import { ComponentProps, ButtonType } from "../../@types";
import * as Icons from "../../assets/icons";
// ⚠️Never update the import bellow to avoid circular dependency
import { getLoaderColor } from "../../shared/utils/elements/button";

export interface ButtonProps {
  url?: string;
  type: ButtonType;
  iconLeft?: keyof typeof Icons /* Compile a list of icons that you exported maybe from figma or compiled from fontawesome that they can select from a dropdown */;
  iconRight?: keyof typeof Icons;
  size: "sm" | "lg";
  className?: string;
  disabled?: boolean;
  target?: "_blank" | "_self" | "_phone" | "_mailto";
  iconLeftClassName?: string;
  iconRightClassName?: string;
  onClick?: (e: any, f?:any) => void;
  style?: React.CSSProperties;
  isLoading?: boolean;
  tabIndex?: number;
  focusRingClassName?: string;
  ariaDescribedBy?: string;
  router: any;
  buttonType?: "button" | "submit" | "reset";
}

interface ButtonElementProps {
  className?: string;
}

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const Button: React.FC<ComponentProps<ButtonProps>> = ({
  children,
  type,
  url,
  className,
  size,
  disabled,
  iconLeft,
  iconRight,
  target = "_self",
  onClick,
  iconLeftClassName,
  iconRightClassName,
  isLoading,
  tabIndex,
  focusRingClassName,
  style: styleProp = {},
  ariaDescribedBy,
  router,
  buttonType,
  ...rest
}) => {
  const ref = useRef<Element>();
  const TagElement = url && onClick === undefined ? "a" : "button";
  let primaryClass: string = TagElement === "a" ? "button-hiperlink" : "";
  let disabledPrimaryClass: string;
  let loadingClass: string;
  let pressedClass: string;

  const navigate = (to?: string) => {
    if (!to) return;

    if (target === "_blank") {
      window.open(to, target);
    } else if (["_phone", "_mailto"].includes(target)) {
      window.open(to);
    } else if (router) {
      router.push(to);
    }
  };

  const onPress = (e: Event) => {
    e.preventDefault();
    if (!disabled && !isLoading) {
      if (url) navigate(url);
      if (onClick) onClick(e);
    }
  };

  const { isPressed } = useButton(
    {
      onPress: onPress as any,
      "aria-describedby": ariaDescribedBy
    },
    ref as RefObject<Element>
  );

  const getButtonElement = (elementProps: ButtonElementProps) => (
    <FocusRing
      focusRingClass={`ring ring-offset-[2px] ring-opacity-50 ring-offset-vtBG ring-magenta ring-[2px] ${focusRingClassName}`}
    >
      <TagElement
        type={buttonType ?? (TagElement === "button" ? "button" : undefined)}
        href={TagElement === "a" ? url : undefined}
        target={TagElement === "a" ? target : undefined}
        {...rest}
        className={`${elementProps.className} ${className}`}
        disabled={disabled}
        tabIndex={tabIndex}
        style={{
          WebkitTapHighlightColor: "transparent",
          ...styleProp
        }}
        onClick={onPress as any}
        ref={ref as any}
      >
        {isLoading && (
          <CircularProgress style={{ color: getLoaderColor(type) }} size={15} />
        )}
        {(!isLoading && iconLeft) &&
          React.createElement(
            Icons[iconLeft] as React.ComponentType<IconProps>, { className: `${iconLeftClassName}` }, null
          )}
        {children}
        {iconRight &&
          React.createElement(Icons[iconRight] as React.ComponentType<IconProps>, { className: `${iconRightClassName}` }, null
          )}
      </TagElement>
    </FocusRing>
  );

  switch (type) {
  case "PRIMARY":
    primaryClass += ` button-primary button-primary__${size}`;
    disabledPrimaryClass = disabled ? " button-primary__disabled" : "";
    loadingClass = isLoading ? " button-primary__loading" : "";
    pressedClass = isPressed ? " button-primary__pressed" : "";

    return getButtonElement({
      className: `${primaryClass}${disabledPrimaryClass}${loadingClass}${pressedClass}`
    });

  case "SECONDARY":
    primaryClass += ` button-secondary button-secondary__${size} active:bg-white`;
    disabledPrimaryClass = disabled ? " button-secondary__disabled" : "";
    loadingClass = isLoading ? " button-secondary__loading" : "";
    pressedClass = isPressed ? " button-secondary__pressed" : "";

    return getButtonElement({
      className: `${primaryClass}${disabledPrimaryClass}${loadingClass}${pressedClass}`
    });

  case "MAGENTA":
    primaryClass += ` button-magenta button-magenta__${size}`;
    disabledPrimaryClass = disabled ? " button-magenta__disabled" : "";
    loadingClass = isLoading ? " button-magenta__loading" : "";
    pressedClass = isPressed ? " button-magenta__pressed" : "";

    return getButtonElement({
      className: `${primaryClass}${disabledPrimaryClass}${loadingClass}${pressedClass}`
    });

  case "NONE":
    return getButtonElement({className: ``});

  default:
    primaryClass += ` button-tertiary button-tertiary__${size}`;
    disabledPrimaryClass = disabled ? " button-tertiary__disabled" : "";
    loadingClass = isLoading ? " button-tertiary__loading" : "";
    pressedClass = isPressed ? " button-tertiary__pressed" : "";

    return getButtonElement({
      className: `${primaryClass}${disabledPrimaryClass}${loadingClass}${pressedClass}`
    });
  }
};

export default Button;
