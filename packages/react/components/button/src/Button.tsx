import * as React from "react";
import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { vars } from "@puzzlepop2/themes";
import { Text } from "@puzzlepop2/react-components-layout";
import { ButtonProps } from "./types";
import {
  buttonStyle,
  enableColorVariant,
  hoverColorVariant,
  activeColorVariant,
} from "./style.css";

const Button = (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const {
    variant = "solid",
    color = "yellow",
    size = "md",
    isDisabled = false,
    isPending = false,
    children,
    style,
    className,
    ...rest
  } = props;

  const enableColor = vars.colors[color]["500"];
  const hoverColor = variant === "solid" ? vars.colors[color]["700"] : vars.colors[color]["200"];
  const activeColor = variant === "solid" ? vars.colors[color]["700"] : vars.colors[color]["200"];

  return (
    <button
      ref={ref}
      className={clsx(
        buttonStyle({
          variant,
        }),
        `button-${size}`,
        className,
      )}
      disabled={isDisabled || isPending}
      style={{
        ...assignInlineVars({
          [enableColorVariant]: enableColor,
          [hoverColorVariant]: hoverColor,
          [activeColorVariant]: activeColor,
        }),
        ...style,
      }}
      {...rest}
    >
      <Text size={size}>{children}</Text>
    </button>
  );
};

const _Button = React.forwardRef(Button);
export { _Button as Button };
