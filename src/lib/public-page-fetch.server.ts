import { resolve4 } from "node:dns/promises";
import { request } from "node:https";
import { isIP } from "node:net";

export function isPublicIPv4(address: string): boolean {
  if (isIP(address) !== 4) return false;
  const [a, b, c] = address.split(".").map(Number);
  return !(
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 0 || b === 168)) ||
    (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) ||
    (a === 203 && b === 0 && c === 113)
  );
}
export function publicPageURL(raw: string) {
  const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    (url.port && url.port !== "443") ||
    !url.hostname.includes(".") ||
    /\.(local|internal|localhost)$/i.test(url.hostname) ||
    (isIP(url.hostname) !== 0 && !isPublicIPv4(url.hostname))
  )
    throw new Error("Use a public HTTPS website address without a password or custom port.");
  return url;
}
/** Resolve, validate, then connect to the exact public IP. No second DNS lookup or automatic redirects.
 * Runtimes without TLS SNI/IP transport fail closed; they must not fall back to ordinary fetch.
 */
export async function fetchPinnedPublicPage(
  url: URL,
): Promise<{ status: number; location?: string; html: string }> {
  publicPageURL(url.toString());
  const addresses = isIP(url.hostname)
    ? [url.hostname]
    : await Promise.race([
        resolve4(url.hostname),
        new Promise<never>((_, reject) => {
          const timer = setTimeout(() => reject(new Error("Website lookup timed out.")), 5000);
          timer.unref?.();
        }),
      ]);
  if (!addresses.length || addresses.some((address) => !isPublicIPv4(address)))
    throw new Error("That website does not resolve to a public address.");
  return new Promise((resolve, reject) => {
    const req = request(
      {
        hostname: addresses[0],
        servername: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method: "GET",
        agent: false,
        headers: {
          Host: url.hostname,
          Accept: "text/html",
          "Accept-Encoding": "identity",
          "User-Agent": "PalmerHouseStudioDemo/1.0",
        },
        signal: AbortSignal.timeout(8000),
      },
      (res) => {
        const status = res.statusCode || 502;
        if (status >= 300 && status < 400) {
          res.destroy();
          resolve({ status, location: res.headers.location, html: "" });
          return;
        }
        if (!/^text\/html\b/i.test(res.headers["content-type"] || "")) {
          res.destroy();
          reject(new Error("That address is not an HTML webpage."));
          return;
        }
        const chunks: Buffer[] = [];
        let size = 0;
        res.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > 400000) {
            res.destroy();
            reject(new Error("That webpage is too large for the demo."));
          } else chunks.push(chunk);
        });
        res.on("error", reject);
        res.on("end", () => resolve({ status, html: Buffer.concat(chunks).toString("utf8") }));
      },
    );
    req.on("error", reject);
    req.end();
  });
}
