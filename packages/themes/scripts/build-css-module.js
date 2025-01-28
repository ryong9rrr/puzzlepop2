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
  const cssStringResultList = [];
  for (const [themeKey, themeValues] of Object.entries(themes)) {
    if (themeKey === "vars") {
      for (const [varsKey, varsValues] of Object.entries(themeValues)) {
        if (varsKey === "colors") {
          cssStringResultList.push(generateColors(varsValues));
          continue;
        }
      }
      continue;
    }
  }

  return cssStringResultList.join("\n");
};

fs.writeFileSync("./dist/themes.css", buildCssModule());
