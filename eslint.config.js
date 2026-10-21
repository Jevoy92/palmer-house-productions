import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      // shadcn components intentionally export their reusable variants next to
      // the component. Those exports are stable and safe for refresh.
      "react-refresh/only-export-components": "off",
    },
  },
  eslintPluginPrettier,
  {
    // Lovable regenerates these integration files and routes in its own formatting.
    // Keep correctness rules active; do not fight vendor-owned formatting.
    files: [
      "src/routes/**/invoke-tool/$tool.ts",
      "src/routes/**/list-tools.ts",
      "src/routes/**/oauth-protected-resource.ts",
      "src/routes/mcp.ts",
      "src/integrations/supabase/types.ts",
      "src/integrations/supabase/previewAuthStorage.ts",
    ],
    rules: { "prettier/prettier": "off" },
  },
  {
    files: ["src/integrations/supabase/previewAuthStorage.ts"],
    // The generated adapter declares its timer before callbacks, then assigns it.
    rules: { "prefer-const": ["error", { ignoreReadBeforeAssign: true }] },
  },
);
