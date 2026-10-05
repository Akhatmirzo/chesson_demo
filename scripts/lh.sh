#!/usr/bin/env bash
# Lighthouse: production build (http://localhost:4000) uchun mobil va desktop. Ishlatish: bash scripts/lh.sh [takrorlar]
export CHROME_PATH="${CHROME_PATH:-C:/Program Files/Google/Chrome/Application/chrome.exe}"
N=${1:-1}
mkdir -p scripts/lh
for mode in mobile desktop; do
  for i in $(seq 1 $N); do
    P=""; [ $mode = desktop ] && P="--preset=desktop"
    npx lighthouse http://localhost:4000/ $P --quiet --output=json --output-path=scripts/lh/$mode-$i.json --chrome-flags="--headless=new" >/dev/null 2>&1
    node -e "
const r=require('./scripts/lh/$mode-$i.json');const a=r.audits;
console.log('$mode #$i', Object.entries(r.categories).map(([k,v])=>k+':'+Math.round(v.score*100)).join(' '), '| LCP',a['largest-contentful-paint'].displayValue,'CLS',a['cumulative-layout-shift'].displayValue,'TBT',a['total-blocking-time'].displayValue,'FCP',a['first-contentful-paint'].displayValue,'SI',a['speed-index'].displayValue);"
  done
done
