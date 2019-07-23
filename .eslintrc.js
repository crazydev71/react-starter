module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jasmine": true,
  },
  "extends": ["airbnb", "plugin:prettier/recommended"],
  "plugins": ["jsx-a11y",  "prettier"],
  "rules": {
    "react/jsx-filename-extension": [1, {"extensions": [".js"]}],
    "react/jsx-one-expression-per-line": 0,
  },
};
