'use strict';
(() => {
  const home = document.getElementById('home-btc-price');
  const price = document.getElementById('btc-price');
  if (!home && !price) return;
  const timestamp = document.getElementById(home ? 'home-price-updated' : 'price-updated');
  const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
  const compactMoney = n => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD',notation:'compact',maximumFractionDigits:2}).format(n);
  let busy = false;
  function fail() {
    (home || price).textContent = 'Price unavailable';
    const change = document.getElementById('btc-change');
    const meta = document.getElementById('price-meta');
    if (change) change.textContent = '';
    if (meta) meta.replaceChildren();
    timestamp.replaceChildren(document.createTextNode('Live data could not be loaded. '));
    const link = document.createElement('a');
    link.href = 'https://www.coingecko.com/en/coins/bitcoin';
    link.textContent = 'View Bitcoin on CoinGecko';
    timestamp.append(link, document.createTextNode(' · '));
    const retry = document.createElement('button');
    retry.type = 'button'; retry.className = 'text-button'; retry.textContent = 'Retry';
    retry.addEventListener('click', load); timestamp.append(retry);
  }
  async function load() {
    if (busy || document.hidden) return;
    busy = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin', {signal:controller.signal});
      if (!response.ok) throw new Error('Market request failed');
      const payload = await response.json();
      const data = Array.isArray(payload) ? payload[0] : null;
      if (!data || !Number.isFinite(data.current_price) || data.current_price <= 0 || !Number.isFinite(Date.parse(data.last_updated))) throw new Error('Invalid market data');
      const age = Date.now() - Date.parse(data.last_updated);
      if (age > 15 * 60 * 1000 || age < -5 * 60 * 1000) throw new Error('Stale market data');
      (home || price).textContent = money(data.current_price);
      if (price) {
        const change = document.getElementById('btc-change');
        const value = data.price_change_percentage_24h;
        change.textContent = Number.isFinite(value) ? `${value >= 0 ? '+' : ''}${value.toFixed(2)}% (24h)` : '24h change unavailable';
        change.className = 'price-change ' + (value >= 0 ? 'positive' : 'negative');
        const meta = document.getElementById('price-meta'); meta.replaceChildren();
        const items = [['Market cap',data.market_cap,compactMoney],['24h volume',data.total_volume,compactMoney],['24h high',data.high_24h,money],['24h low',data.low_24h,money],['All-time high',data.ath,money],['Circulating supply',data.circulating_supply,n=>n.toLocaleString('en-US',{maximumFractionDigits:0})+' BTC']];
        for (const [label, amount, format] of items) {
          const row = document.createElement('div');row.className='price-meta-item';
          const key = document.createElement('span');key.className='meta-label';key.textContent=label;
          const val = document.createElement('span');val.className='meta-val';val.textContent=Number.isFinite(amount)?format(amount):'Unavailable';
          row.append(key,val);meta.append(row);
        }
      }
      timestamp.textContent = 'CoinGecko data as of ' + new Date(data.last_updated).toLocaleString() + ' · Refreshes every minute';
    } catch { fail(); }
    finally { clearTimeout(timer);busy=false; }
  }
  load(); setInterval(load,60000);
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) load(); });
})();
