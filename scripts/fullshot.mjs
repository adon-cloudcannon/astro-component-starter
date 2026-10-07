import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });
await p.goto(process.argv[2], { waitUntil: "networkidle" });
await p.waitForTimeout(900);
await p.screenshot({ path: process.argv[3], fullPage: true });
const h = await p.evaluate(() => document.body.scrollHeight);
console.log("full height", h);
await b.close();
