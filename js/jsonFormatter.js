// JSON Formatter module
export default function initJSONFormatter(){
  const ta = document.getElementById('json-input');
  const out = document.getElementById('json-output');
  const btn = document.getElementById('json-validate');
  const btnCopy = document.getElementById('json-copy');

  btn.addEventListener('click', ()=>{
    const text = ta.value.trim();
    if(!text){ out.textContent = ''; return; }
    try{
      const parsed = JSON.parse(text);
      const pretty = JSON.stringify(parsed, null, 2);
      out.textContent = pretty;
      out.style.color = '';
    }catch(e){
      out.textContent = 'Invalid JSON: ' + e.message;
      out.style.color = 'crimson';
    }
  });

  btnCopy.addEventListener('click', async ()=>{
    try{ await navigator.clipboard.writeText(out.textContent || ''); btnCopy.textContent='Copied'; setTimeout(()=>btnCopy.textContent='Copy',900);}catch(e){alert('Copy failed');}
  });
}
