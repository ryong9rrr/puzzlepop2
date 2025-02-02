import * as React from "react";
import clsx from "clsx";
import { Text } from "@puzzlepop2/react-components-layout";
import { ButtonProps } from "./types";
import { buttonStyle } from "./style.css";

const Button = (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const {
    variant = "shadow",
    color = "inherit",
    size = "md",
    isDisabled = false,
    isPending = false,
    children,
    className,
    style,
    ...rest
  } = props;

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
        ...style,
      }}
      {...rest}
    >
      <Text typography={size}>{children}</Text>
    </button>
  );
};

const _Button = React.forwardRef(Button);
export { _Button as Button };
