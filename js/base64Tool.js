// Base64 encode/decode supporting Unicode
export default function initBase64(){
  const ta = document.getElementById('b64-input');
  const out = document.getElementById('b64-output');
  const btnEnc = document.getElementById('b64-encode');
  const btnDec = document.getElementById('b64-decode');
  const btnCopy = document.getElementById('b64-copy');

  function encodeUnicode(str){
    if (!str) return '';
    const enc = new TextEncoder();
    const bytes = enc.encode(str);
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
  }
  
  function decodeUnicode(b64){
    if (!b64) return '';
    const binary = atob(b64);
    const bytes = new Uint8Array(Array.from(binary).map(ch => ch.charCodeAt(0)));
    const dec = new TextDecoder();
    return dec.decode(bytes);
  }

  btnEnc.addEventListener('click', ()=>{
    try {
      const result = encodeUnicode(ta.value || '');
      out.textContent = result || 'Enter text to encode...';
      if (result) {
        out.classList.add('success-message');
        setTimeout(() => out.classList.remove('success-message'), 1000);
      }
    } catch(e) {
      out.textContent = '❌ Encoding failed: ' + e.message;
      out.classList.add('error-message');
      setTimeout(() => out.classList.remove('error-message'), 2000);
    }
  });
  
  btnDec.addEventListener('click', ()=>{
    try{ 
      const result = decodeUnicode(ta.value || '');
      out.textContent = result || 'Enter Base64 to decode...';
      if (result) {
        out.classList.add('success-message');
        setTimeout(() => out.classList.remove('success-message'), 1000);
      }
    }catch(e){ 
      out.textContent = '❌ Invalid Base64: ' + e.message;
      out.classList.add('error-message');
      out.classList.add('shake');
      setTimeout(() => {
        out.classList.remove('error-message', 'shake');
      }, 2000);
    }
  });
  
  btnCopy.addEventListener('click', async ()=>{ 
    try{ 
      await navigator.clipboard.writeText(out.textContent || ''); 
      btnCopy.textContent='✓ Copied!'; 
      setTimeout(()=>btnCopy.textContent='Copy to Clipboard', 1500);
    }catch(e){
      btnCopy.textContent='❌ Failed';
      setTimeout(()=>btnCopy.textContent='Copy to Clipboard', 1500);
    } 
  });
}
