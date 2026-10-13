import { chromium } from "playwright-core";
const [src, outDir, ...pairs] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome", args: ["--allow-file-access-from-files"] });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("file://" + src);
await p.waitForTimeout(400);
await p.addStyleTag({ content: "html,body{margin:0;background:#fff}img{position:absolute!important;top:0;left:0;max-width:none!important;max-height:none!important;width:auto!important;height:auto!important}" });
for (const pair of pairs) {
  const [name, top, height] = pair.split(":");
  await p.setViewportSize({ width: 1280, height: Number(height) });
  await p.evaluate((t) => scrollTo(0, t), Number(top));
  await p.waitForTimeout(200);
  await p.screenshot({ path: `${outDir}/${name}.png` });
}
await b.close();
