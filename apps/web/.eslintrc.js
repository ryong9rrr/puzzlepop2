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
  plugins: ["@typescript-eslint", "react", "react-hooks", "import", "jsx-a11y"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier", // 반드시 맨 마지막에 위치
  ],
  rules: {
    ...baseConfig.rules,
    "import/named": "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/react-in-jsx-scope": "off", // Next.js에서는 필요 없음
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
