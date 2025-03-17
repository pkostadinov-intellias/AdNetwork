const eslintPluginPrettier = require.resolve("eslint-plugin-prettier");
const eslintConfigPrettier = require("eslint-config-prettier");
const eslintPluginTypescript = require.resolve("@typescript-eslint/eslint-plugin");
const eslintParserTypescript = require.resolve("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: eslintParserTypescript
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: eslintPluginPrettier
    },
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": "error",
      "no-console": "warn"
    }
  }
];
