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
      solid: {
        border: "none",
        backgroundColor: enableColorVariant,
        color: "white",

        "&:hover:not([disabled])": {
          backgroundColor: hoverColorVariant,
        },

        "&:active:not([disabled])": {
          backgroundColor: activeColorVariant,
        },

        "&[data-is-selected='true']": {
          backgroundColor: activeColorVariant,
        },
      },

      outline: {
        border: "1px solid",
        backgroundColor: "transparent",
        color: enableColorVariant,

        "&:hover:not([disabled])": {
          backgroundColor: hoverColorVariant,
          color: "white",
        },

        "&:active:not([disabled])": {
          backgroundColor: activeColorVariant,
          color: "white",
        },

        "&[data-is-selected='true']": {
          backgroundColor: activeColorVariant,
          color: "white",
        },
      },

      shadow: {
        border: "none",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        color: "white",
        boxShadow: "0 0 2px rgba(0, 0, 0, 0.4)", // boxshadow도 반응형으로... (md기준 6px)

        "&:hover:not([disabled])": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },

        "&:active:not([disabled])": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },

        "&[data-is-selected='true']": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },

        "@media": {
          "screen and (min-width: 768px)": {
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.4)",
          },
          "screen and (min-width: 1024px)": {
            boxShadow: "0 0 6px rgba(0, 0, 0, 0.4)",
          },
          "screen and (min-width: 1440px)": {
            boxShadow: "0 0 8px rgba(0, 0, 0, 0.4)",
          },
        },
      },
    },
  },
});
