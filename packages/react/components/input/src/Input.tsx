import * as React from "react";
import clsx from "clsx";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ColorLevel, vars } from "@puzzlepop2/themes";

import { inputStyle, focusColorVariant } from "./input.css";
import { InputProps } from "./types";

const Input = (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
  const { className, color = "orange", style, ...rest } = props;

  const focusColor = getColor(color, 500);

  return (
    <input
      {...rest}
      ref={ref}
      className={clsx(inputStyle, className)}
      style={{
        ...assignInlineVars({
          [focusColorVariant]: focusColor,
        }),
        ...style,
      }}
    />
  );
};

const _Input = React.forwardRef(Input);
export { _Input as Input };

const getColor = (color: keyof typeof vars.colors, level: ColorLevel) => {
  if (color === "white" || color === "black") {
    return color;
  }
  return vars.colors[color][level];
};
