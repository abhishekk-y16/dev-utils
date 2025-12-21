// Color generator module
export default function initColor(){
  const btn = document.getElementById('color-gen');
  const copyBtn = document.getElementById('color-copy');
  const preview = document.getElementById('color-preview');
  const hexEl = document.getElementById('color-hex');
  const rgbEl = document.getElementById('color-rgb');

  function randomInt(n){ return Math.floor(Math.random()*n); }
  function rgbToHex(r,g,b){
    return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
  }
  function gen(){
    const r=randomInt(256), g=randomInt(256), b=randomInt(256);
    const hex = rgbToHex(r,g,b);
    preview.style.background = hex;
    hexEl.textContent = `HEX: ${hex}`;
    rgbEl.textContent = `RGB: rgb(${r},${g},${b})`;
    return {hex, rgb:`rgb(${r},${g},${b})`};
  }

  btn.addEventListener('click', gen);
  copyBtn.addEventListener('click', async ()=>{
    const text = hexEl.textContent.replace('HEX: ','');
    try{ await navigator.clipboard.writeText(text); copyBtn.textContent='Copied'; setTimeout(()=>copyBtn.textContent='Copy',900);}catch(e){}
  });
  gen();
}
