import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node  // Adiciona os globals do Node.js
      }
    }
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      // Aqui você define explicitamente que está usando o ambiente Node.js
      sourceType: "module",
      ecmaVersion: 2022,
      env: {
        node: true,  // Esta é a configuração que você precisa
      }
    },
    plugins: { js },
    extends: ["js/recommended"]
  },
]);
