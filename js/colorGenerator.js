// Color generator module with HSL support and history
export default function initColor(){
  const btn = document.getElementById('color-gen');
  const copyBtn = document.getElementById('color-copy');
  const preview = document.getElementById('color-preview');
  const hexEl = document.getElementById('color-hex');
  const rgbEl = document.getElementById('color-rgb');
  const hslEl = document.getElementById('color-hsl');
  const historyEl = document.getElementById('color-history');
  
  let colorHistory = JSON.parse(localStorage.getItem('colorHistory') || '[]');

  function randomInt(n){ 
    // Use crypto for better randomness
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % n;
  }
  
  function rgbToHex(r,g,b){
    return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
  }
  
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
  
  function addToHistory(hex) {
    colorHistory.unshift(hex);
    colorHistory = colorHistory.slice(0, 10); // Keep last 10
    localStorage.setItem('colorHistory', JSON.stringify(colorHistory));
    renderHistory();
  }
  
  function renderHistory() {
    if (!historyEl) return;
    
    if (colorHistory.length === 0) {
      historyEl.innerHTML = '<p class="muted">Your recently generated colors will appear here...</p>';
      return;
    }
    
    historyEl.innerHTML = colorHistory.map(hex => 
      `<div class="color-history-item" style="background:${hex}" title="${hex}" onclick="navigator.clipboard.writeText('${hex}')"></div>`
    ).join('');
  }
  
  function gen(){
    const r=randomInt(256), g=randomInt(256), b=randomInt(256);
    const hex = rgbToHex(r,g,b);
    const hsl = rgbToHsl(r, g, b);
    
    preview.style.background = hex;
    hexEl.textContent = `HEX: ${hex}`;
    rgbEl.textContent = `RGB: rgb(${r},${g},${b})`;
    if (hslEl) hslEl.textContent = `HSL: hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`;
    
    addToHistory(hex);
    
    preview.style.animation = 'none';
    setTimeout(() => { preview.style.animation = 'colorFade 0.4s ease'; }, 10);
    
    return {hex, rgb:`rgb(${r},${g},${b})`, hsl:`hsl(${hsl.h},${hsl.s}%,${hsl.l}%)`};
  }

  btn.addEventListener('click', gen);
  
  copyBtn.addEventListener('click', async ()=>{
    const text = hexEl.textContent.replace('HEX: ','');
    try{ 
      await navigator.clipboard.writeText(text); 
      copyBtn.textContent='✓ Copied!'; 
      setTimeout(()=>copyBtn.textContent='Copy HEX', 1500);
    }catch(e){
      copyBtn.textContent='❌ Failed';
      setTimeout(()=>copyBtn.textContent='Copy HEX', 1500);
    }
  });
  
  // Individual copy buttons
  document.querySelectorAll('.color-copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const format = e.target.dataset.format;
      let text = '';
      if (format === 'hex') text = hexEl.textContent.replace('HEX: ', '');
      else if (format === 'rgb') text = rgbEl.textContent.replace('RGB: ', '');
      else if (format === 'hsl' && hslEl) text = hslEl.textContent.replace('HSL: ', '');
      
      try {
        await navigator.clipboard.writeText(text);
        e.target.textContent = '✓';
        setTimeout(() => e.target.textContent = 'Copy', 1200);
      } catch(err) {
        e.target.textContent = '❌';
        setTimeout(() => e.target.textContent = 'Copy', 1200);
      }
    });
  });
  
  renderHistory();
  gen();
}
