// Base64 encode/decode supporting Unicode
export default function initBase64(){
  const ta = document.getElementById('b64-input');
  const out = document.getElementById('b64-output');
  const btnEnc = document.getElementById('b64-encode');
  const btnDec = document.getElementById('b64-decode');
  const btnCopy = document.getElementById('b64-copy');

  function encodeUnicode(str){
    const enc = new TextEncoder();
    const bytes = enc.encode(str);
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
  }
  function decodeUnicode(b64){
    const binary = atob(b64);
    const bytes = new Uint8Array(Array.from(binary).map(ch => ch.charCodeAt(0)));
    const dec = new TextDecoder();
    return dec.decode(bytes);
  }

  btnEnc.addEventListener('click', ()=>{
    out.textContent = encodeUnicode(ta.value || '');
  });
  btnDec.addEventListener('click', ()=>{
    try{ out.textContent = decodeUnicode(ta.value || ''); }catch(e){ out.textContent = 'Invalid Base64'; }
  });
  btnCopy.addEventListener('click', async ()=>{ try{ await navigator.clipboard.writeText(out.textContent || ''); btnCopy.textContent='Copied'; setTimeout(()=>btnCopy.textContent='Copy',900);}catch(e){} });
}
