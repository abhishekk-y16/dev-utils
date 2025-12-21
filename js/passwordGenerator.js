// Password Generator module
// Exports an init function that wires UI elements
export default function initPassword(){
  const len = document.getElementById('pw-length');
  const upper = document.getElementById('pw-upper');
  const lower = document.getElementById('pw-lower');
  const numbers = document.getElementById('pw-numbers');
  const symbols = document.getElementById('pw-symbols');
  const output = document.getElementById('pw-output');
  const btnGen = document.getElementById('pw-generate');
  const btnCopy = document.getElementById('pw-copy');

  function randomFrom(arr){
    const idx = crypto.getRandomValues(new Uint32Array(1))[0] % arr.length;
    return arr[idx];
  }

  function generatePassword(){
    const size = Math.max(4, Math.min(128, Number(len.value) || 16));
    let pool = '';
    if(upper.checked) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(lower.checked) pool += 'abcdefghijklmnopqrstuvwxyz';
    if(numbers.checked) pool += '0123456789';
    if(symbols.checked) pool += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if(!pool) return '';
    // build password using secure RNG
    const pwChars = [];
    const bytes = new Uint32Array(size);
    crypto.getRandomValues(bytes);
    for(let i=0;i<size;i++) pwChars.push(pool[bytes[i] % pool.length]);
    return pwChars.join('');
  }

  btnGen.addEventListener('click', ()=>{ output.value = generatePassword(); });
  btnCopy.addEventListener('click', async ()=>{
    try{ await navigator.clipboard.writeText(output.value || ''); btnCopy.textContent='Copied'; setTimeout(()=>btnCopy.textContent='Copy',900); }catch(e){alert('Copy failed');}
  });
}
