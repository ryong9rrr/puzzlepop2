import { HTMLAttributes, JSX } from "react";

type AsProps = {
  as?: Exclude<keyof JSX.IntrinsicElements, keyof SVGElementTagNameMap>;
};

type ElementProps = Omit<HTMLAttributes<HTMLElement>, "as">;

export type AsElementProps = AsProps & ElementProps;
