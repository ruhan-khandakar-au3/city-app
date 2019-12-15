module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "no-console": "off",
    "comma-dangle": ["error", "never"],
    "no-trailing-spaces": ["error", { ignoreComments: true }],
    "arrow-parens": [0, "always"],
    "implicit-arrow-linebreak": [0, "always"],
    "no-useless-escape": [0, "always"],
    "no-underscore-dangle": [0, "always"],
    "operator-linebreak": [0, "always"],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ]
  }
};
