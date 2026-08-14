import { chromium } from '/Users/jevoypalmer/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';

const out = '/Users/jevoypalmer/Documents/Codex_Projects/holo-brand-guide/assets/screens';
await fs.mkdir(out, { recursive: true });

const pages = [
  ['home', 'https://tryholo.ai/'],
  ['pricing', 'https://tryholo.ai/pricing'],
  ['about', 'https://tryholo.ai/about-us'],
  ['affiliate', 'https://tryholo.ai/affiliate'],
  ['blog', 'https://tryholo.ai/blog'],
  ['ad-generator', 'https://tryholo.ai/ad-generator'],
  ['newsletter-generator', 'https://tryholo.ai/ai-newsletter-generator'],
  ['ugc-generator', 'https://tryholo.ai/ai-ugc-generator'],
  ['facebook-ads', 'https://tryholo.ai/facebook-ads-maker'],
  ['influencer-generator', 'https://tryholo.ai/influencer-generator'],
  ['instagram-ads', 'https://tryholo.ai/instagram-ads-maker'],
  ['tiktok-video', 'https://tryholo.ai/tiktok-video-generator'],
];

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--disable-gpu', '--hide-scrollbars', '--no-first-run'],
});

for (const [slug, url] of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(4500);
  await page.addStyleTag({ content: `
    *, *::before, *::after { animation-delay: 0s !important; animation-duration: 0s !important; transition: none !important; }
    html { scroll-behavior: auto !important; }
  ` });
  // Trigger lazy-loaded sections before making the full-page capture.
  await page.evaluate(async () => {
    const step = 700;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${out}/${slug}.png`, fullPage: true });
  console.log(`${slug}\t${await page.evaluate(() => document.documentElement.scrollHeight)}px\t${url}`);
  await page.close();
}

await browser.close();
