import * as React from "react";
import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { vars } from "@puzzlepop2/themes";
import { ButtonProps } from "./types";
import {
  buttonStyle,
  enableColorVariant,
  hoverColorVariant,
  activeColorVariant,
  borderVariant,
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
  const hoverColor = defineHoverColorVariant({ variant, color });
  const activeColor = defineActiveColorVariant({ variant, color });
  const border = defineBorderVariant({ variant, color });

  return (
    <button
      ref={ref}
      className={clsx(
        buttonStyle({
          variant,
        }),
        `btn-${size}`,
        className,
      )}
      disabled={isDisabled || isPending}
      style={{
        ...assignInlineVars({
          [enableColorVariant]: enableColor,
          [hoverColorVariant]: hoverColor,
          [activeColorVariant]: activeColor,
          [borderVariant]: border,
        }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

const _Button = React.forwardRef(Button);
export { _Button as Button };

const defineBorderVariant = (props: Required<Pick<ButtonProps, "variant" | "color">>) => {
  const { variant, color } = props;

  if (variant === "solid") {
    return `0.1rem solid ${vars.colors[color]["600"]}`;
  }
  if (variant === "outline") {
    return "0.1rem solid";
  }
  return "none";
};

const defineHoverColorVariant = (props: Required<Pick<ButtonProps, "variant" | "color">>) => {
  const { variant, color } = props;

  if (variant === "solid") {
    return vars.colors[color]["700"];
  }

  if (color === "yellow") {
    return vars.colors[color]["500"];
  }

  return vars.colors[color]["200"];
};

const defineActiveColorVariant = (props: Required<Pick<ButtonProps, "variant" | "color">>) => {
  const { variant, color } = props;

  if (variant === "solid") {
    return vars.colors[color]["700"];
  }

  if (color === "yellow") {
    return vars.colors[color]["500"];
  }

  return vars.colors[color]["200"];
};
