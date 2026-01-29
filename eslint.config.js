import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // Ignorados globalmente
  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      ".output",
      ".tanstack",
      "coverage",
      "pb_data",
      "pb_migrations",
    ],
  },

  // Base JS
  js.configs.recommended,

  // React + TS
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true, // 🔥 ativa regras type-aware
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint,
    },
    rules: {
      /* =======================
         TypeScript (importante)
      ======================== */

      // deixa o TS cuidar disso
      "no-undef": "off",

      // regra correta pra unused
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // evita promessas esquecidas
      "@typescript-eslint/no-floating-promises": "error",

      // evita any acidental
      "@typescript-eslint/no-explicit-any": "warn",

      // coerência de types
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // melhor que ! (non-null assertion)
      "@typescript-eslint/no-non-null-assertion": "warn",

      /* =======================
         React
      ======================== */

      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      /* =======================
         Hooks
      ======================== */

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* =======================
         Qualidade geral
      ======================== */

      "no-console": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
