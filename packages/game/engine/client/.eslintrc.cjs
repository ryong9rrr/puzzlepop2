const baseConfig = require("../../../../eslint.base.config.cjs");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021, // 최신 JS 문법 사용
    sourceType: "module", // 모듈 방식 사용
    ecmaFeatures: {
      jsx: true, // JSX 사용 설정
    },
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["react", "@typescript-eslint", "react-hooks", "jsx-a11y"],
  rules: {
    ...baseConfig.rules,
    "no-undef": "warn",
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "warn",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
    },
  ],
  ignorePatterns: ["dist/", "node_modules/"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
