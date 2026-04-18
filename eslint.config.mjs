import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "prefer-const": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Block deprecated Next 14/15 patterns
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/index", "**/index.ts", "**/index.tsx"],
              message:
                "Barrel files break tree-shaking. Import from the source file directly.",
            },
          ],
        },
      ],
    },
  },
  // Allow default exports only where Next.js requires them (pages, layouts,
  // error boundaries, proxy.ts, route handlers). For components and hooks,
  // use named exports.
  {
    files: ["src/components/**/*.tsx", "src/hooks/**/*.ts", "src/lib/**/*.ts"],
    rules: {
      "import/no-default-export": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
