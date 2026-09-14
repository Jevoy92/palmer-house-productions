import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const here = fileURLToPath(new URL(".", import.meta.url));
const sourceRoot = process.env.STUDIO_PREVIEW_SOURCE
  ? resolve(process.env.STUDIO_PREVIEW_SOURCE)
  : resolve(here, "../..");
const mock = resolve(here, "mocks.ts");

export default defineConfig(({ command }) => {
  if (command !== "serve") throw new Error("The synthetic Studio preview is development-only.");
  return {
    root: here,
    cacheDir: resolve(
      tmpdir(),
      "studio-preview-vite",
      createHash("sha256").update(sourceRoot).digest("hex").slice(0, 12),
    ),
    publicDir: resolve(sourceRoot, "public"),
    plugins: [
      {
        name: "preview-context-export",
        enforce: "pre",
        transform(code, id) {
          if (!id.replaceAll("\\", "/").endsWith("/components/studio/StudioProvider.tsx")) return;
          // Allows this same harness to inspect a historical source tree without
          // editing its auth provider, including revisions with a private context.
          if (/export\s+(?:const|let)\s+StudioContext\b/.test(code)) return;
          if (/export\s*\{[^}]*\bStudioContext\b/.test(code)) return;
          return `${code}\nexport { StudioContext };\n`;
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: [
        { find: "@/lib/studio-server", replacement: mock },
        { find: "@/lib/supabase/client", replacement: mock },
        { find: "@/integrations/supabase/client", replacement: mock },
        { find: "@/integrations/lovable/index", replacement: mock },
        { find: "@/lib/audio-wav", replacement: mock },
        { find: "@", replacement: resolve(sourceRoot, "src") },
      ],
      dedupe: ["react", "react-dom", "@tanstack/react-router"],
    },
    server: {
      host: "127.0.0.1",
      port: 4175,
      strictPort: true,
      fs: { allow: [here, sourceRoot, resolve(here, "../..")] },
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
        "Content-Security-Policy":
          "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; media-src 'self' blob:; connect-src 'self' ws://127.0.0.1:*; frame-src 'none'; form-action 'none'",
      },
    },
  };
});
