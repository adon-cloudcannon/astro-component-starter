import { chromium } from "playwright-core";
const dir = "/private/tmp/claude-501/-Users-adonmoskal-chasing-cars/54d4d8a1-c91c-43e4-9d44-2b20dbd9c138/scratchpad";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
const score = async (file, box) => {
  await page.goto(`file://${dir}/${file}`);
  return page.evaluate(({ box }) => new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const [x0, y0, w, h] = box;
      const d = ctx.getImageData(x0, y0, w, h).data;
      let sum = 0;
      for (let i = 0; i < d.length; i += 4) sum += Math.max(0, (d[i] + d[i + 1]) / 2 - d[i + 2]);
      res(+(sum / (d.length / 4)).toFixed(3));
    };
    img.src = location.href;
  }), { box });
};
for (const [label, box] of [["behind the quote", [40, 240, 260, 160]], ["band edge (control)", [40, 560, 260, 70]]]) {
  const on = await score("hz-on.png", box), off = await score("hz-off.png", box);
  console.log(`${label.padEnd(22)} haze on ${String(on).padEnd(8)} haze off ${off}   ->  ${((1 - on / off) * 100).toFixed(0)}% of the pattern knocked back`);
}
await browser.close();
