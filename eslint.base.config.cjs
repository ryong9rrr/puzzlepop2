// Tip: module.exports로 내보내진 CommonJS 모듈은 ESM에서 사용할 때 구조분해할당을 사용할 수 없습니다.
// 따라서 외부에서 사용할 때는 import baseConfig ... 로 사용하세요.
module.exports = {
  rules: {
    "no-warning-comments": [
      "warn",
      {
        terms: ["TODO", "FIXME", "XXX", "BUG"],
        location: "anywhere",
      },
    ],
    "no-var": "error",
    curly: ["error", "all"],
    eqeqeq: ["error", "always", { null: "ignore" }],
  },
};
