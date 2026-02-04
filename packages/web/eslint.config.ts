import { tanstackConfig } from "@tanstack/eslint-config";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";

const config = [
  ...tanstackConfig,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    settings: {
      react: { version: "detect" },
    },
    plugins: { react },
    rules: {
      // Bugs
      "react/jsx-key": "error",
      "react/jsx-no-leaked-render": "error",
      "react/no-unstable-nested-components": "error",
      "react/jsx-no-constructed-context-values": "error",

      // Security
      "react/jsx-no-target-blank": "error",

      // Code quality
      "react/no-array-index-key": "warn",
      "react/hook-use-state": "warn",
      "react/jsx-no-useless-fragment": "warn",

      // Style
      "react/self-closing-comp": "warn",
    },
  },
];

export default config;
