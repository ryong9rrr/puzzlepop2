import { createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@puzzlepop2/themes";

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
        color: vars.colors.white,

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
          color: vars.colors.white,
        },

        "&:active:not([disabled])": {
          backgroundColor: activeColorVariant,
          color: vars.colors.white,
        },

        "&[data-is-selected='true']": {
          backgroundColor: activeColorVariant,
          color: vars.colors.white,
        },
      },

      shadow: {
        border: "none",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        color: vars.colors.white,
        boxShadow:
          "rgba(17, 17, 26, 0.1) 0px 0.2rem 0.6rem, rgba(17, 17, 26, 0.05) 0px 0.4rem 0.8rem",

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
