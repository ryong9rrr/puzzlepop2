const baseConfig = require("./base");

module.exports = {
  extends: [...baseConfig.extends, "eslint:recommended"],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    ...baseConfig.rules,
  },
};
