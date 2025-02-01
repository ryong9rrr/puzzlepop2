import fs from "fs";
import * as themes from "../dist/index.js";

const generateColors = object => {
  let cssString = ``;
  for (const [colorKey, colorValues] of Object.entries(object)) {
    Object.entries(colorValues).forEach(([colorLevel, colorValue]) => {
      cssString += `  --${colorKey}-${colorLevel}: ${colorValue};\n`;
    });
  }
  return `:root {\n${cssString}}`;
};

const buildCssModule = () => {
  const vars = [];
  const classes = [];
  for (const [themeKey, themeValues] of Object.entries(themes)) {
    if (themeKey === "vars") {
      for (const [varsKey, varsValues] of Object.entries(themeValues)) {
        if (varsKey === "colors") {
          vars.push(generateColors(varsValues));
          continue;
        }
      }
      continue;
    }

    if (themeKey === "classes") {
      for (const [classesKey, classesValues] of Object.entries(themeValues)) {
        if (classesKey === "responsiveCssString") {
          classes.push(classesValues);
        }
      }
    }
  }

  return [...vars, ...classes].join("\n");
};

fs.writeFileSync("./dist/themes.css", buildCssModule());
