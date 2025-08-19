// eslint.config.mjs
import { FlatCompat } from "eslint-define-config";

// Create a compatibility layer for legacy configs (like React rules)
const compat = new FlatCompat({ eslint: new ESLint() });

export default [
  // Extend recommended rules for ESLint
  ...compat.extends([
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended"
  ]),

  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
    },
    rules: {
      // Your custom rules
      "react/prop-types": "off",
      "no-console": "warn",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
