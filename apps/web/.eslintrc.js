const baseConfig = require("../../eslint.base.config.cjs");

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
  rules: {
    ...baseConfig.rules,
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/react-in-jsx-scope": "off", // Next.js 환경에서 필요 없음
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
