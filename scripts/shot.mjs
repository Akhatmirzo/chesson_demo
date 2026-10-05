// Dev yordamchi: headless Chrome (CDP) orqali sahifa skrinshoti. Qo'shimcha kutubxonasiz.
// Ishlatish: node scripts/shot.mjs <url> <chiqish.png> [eni] [bo'yi] [--mobile] [--transparent] [--wait=JS_ifoda] [--scroll=px] [--full]
import { spawn } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
const flags = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => ((x) => { const i = x.indexOf('='); return i < 0 ? [x, ''] : [x.slice(0, i), x.slice(i + 1)]; })(a.slice(2))));
const [url, out, w = '1440', h = '900'] = args.filter((a) => !a.startsWith('--'));
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), 'shot-'));

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--hide-scrollbars', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    target = list.find((t) => t.type === 'page');
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
const logs = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type))
    logs.push(`[${m.params.type}] ` + m.params.args.map((a) => a.value ?? a.description).join(' '));
  if (m.method === 'Runtime.exceptionThrown') logs.push('[exception] ' + m.params.exceptionDetails.exception?.description);
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

const mobile = 'mobile' in flags;
await send('Runtime.enable');
await send('Page.enable');
if ('metrics' in flags) await send('Performance.enable');
await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: mobile ? 2 : 1, mobile });
if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
if ('transparent' in flags) await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
if ('nojs' in flags) await send('Emulation.setScriptExecutionDisabled', { value: true });
if (flags.inject) await send('Page.addScriptToEvaluateOnNewDocument', { source: "document.addEventListener('DOMContentLoaded',()=>{}); (function(){const st=document.createElement('style');st.textContent=" + JSON.stringify(flags.inject) + ";(document.head||document.documentElement).appendChild(st)})()" });
await send('Page.navigate', { url });
await sleep(1500);
if (flags.wait) {
  for (let i = 0; i < 100 && !(await evaluate(flags.wait)); i++) await sleep(200);
}
if ('mousemove' in flags) { for (const [x, y] of [[300, 300], [600, 400], [700, 420]]) { await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }); await sleep(100); } }
if (flags.wait2) { for (let i = 0; i < 100 && !(await evaluate(flags.wait2)); i++) await sleep(200); }
await sleep(+(flags.delay ?? 1500));
if (flags.scroll) {
  await evaluate(`window.scrollTo(0, ${flags.scroll})`);
  await sleep(1500);
}
// --sections=id1,id2,... — har bir bo'limga scroll qilib alohida skrinshot
if (flags.sections) {
  for (const sid of flags.sections.split(',')) {
    const [name, offset = '0'] = sid.split(':');
    await evaluate(`(() => { const el = document.getElementById('${name}'); if (!el) return; const y = el.getBoundingClientRect().top + window.scrollY + ${offset}; window.scrollTo(0, y - 64); })()`);
    await sleep(+(flags.settle ?? 2500));
    if (flags.eval) { await evaluate(flags.eval); await sleep(1500); }
    const s = await send('Page.captureScreenshot', { format: 'png' });
    const file = out.replace(/\.png$/, `-${name}${offset !== '0' ? offset : ''}.png`);
    writeFileSync(file, Buffer.from(s.result.data, 'base64'));
    console.log('saved', file);
  }
  if (logs.length) console.log(logs.join(String.fromCharCode(10)));
  ws.close(); chrome.kill(); await sleep(500);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  process.exit(0);
}
if (flags.print) console.log(JSON.stringify(await evaluate(flags.print), null, 1));
if ('metrics' in flags) { const m = (await send('Performance.getMetrics')).result.metrics; const g = (n) => Math.round((m.find((x) => x.name === n)?.value ?? 0) * 1000); console.log('METRICS', JSON.stringify({ layout: g('LayoutDuration'), style: g('RecalcStyleDuration'), script: g('ScriptDuration'), task: g('TaskDuration'), layouts: Math.round(m.find((x) => x.name === 'LayoutCount').value) })); }
let clip;
if ('full' in flags) {
  const height = await evaluate('document.documentElement.scrollHeight');
  await send('Emulation.setDeviceMetricsOverride', { width: +w, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await sleep(1500);
}
const shot = await send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: 'full' in flags });
writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log('saved', out);
if (logs.length) console.log(logs.join('\n'));
ws.close();
chrome.kill();
await sleep(500);
try { rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(0);
