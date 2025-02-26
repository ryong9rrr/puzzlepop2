const baseConfig = require("../../../../eslint.base.config.cjs");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    ...baseConfig.rules,
    "no-unused-vars": "warn",
  },
  ignorePatterns: [".*.js", "dist/", "node_modules/"],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
