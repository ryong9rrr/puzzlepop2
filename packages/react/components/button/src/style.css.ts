import { createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const enableColorVariant = createVar();
export const hoverColorVariant = createVar();
export const activeColorVariant = createVar();

export const buttonStyle = recipe({
  base: {
    margin: 0,
    //padding: 0,
    //borderRadius: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    userSelect: "none",
    transition: "background-color 0.1s, color 0.1s, border-color 0.1s",

    // @ts-ignore
    "&[disabled]": {
      opacity: 0.3,
      cursor: "not-allowed",
    },
  },

  variants: {
    variant: {
      shadow: {
        border: "none",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        color: "white",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.6)", // boxshadow도 반응형으로... (md기준 6px)

        "&:hover:not([disabled])": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },

        "&:active:not([disabled])": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },

        "&[data-is-selected='true']": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  },
});
