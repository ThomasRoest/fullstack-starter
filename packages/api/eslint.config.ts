import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

const config = [
  { ignores: ["dist/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
];

export default config;
