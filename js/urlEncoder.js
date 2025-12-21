// URL encoder/decoder module
export default function initURL(){
  const ta = document.getElementById('url-input');
  const out = document.getElementById('url-output');
  const enc = document.getElementById('url-encode');
  const dec = document.getElementById('url-decode');
  const copyBtn = document.getElementById('url-copy');

  enc.addEventListener('click', ()=>{ out.textContent = encodeURIComponent(ta.value || ''); });
  dec.addEventListener('click', ()=>{
    try{ out.textContent = decodeURIComponent(ta.value || ''); }catch(e){ out.textContent = 'Invalid encoded string'; }
  });
  copyBtn.addEventListener('click', async ()=>{ try{ await navigator.clipboard.writeText(out.textContent || ''); copyBtn.textContent='Copied'; setTimeout(()=>copyBtn.textContent='Copy',900);}catch(e){} });
}
