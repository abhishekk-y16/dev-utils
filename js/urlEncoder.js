// URL encoder/decoder module with improved feedback
export default function initURL(){
  const ta = document.getElementById('url-input');
  const out = document.getElementById('url-output');
  const enc = document.getElementById('url-encode');
  const dec = document.getElementById('url-decode');
  const copyBtn = document.getElementById('url-copy');

  enc.addEventListener('click', ()=>{ 
    const input = ta.value || '';
    if (!input) {
      out.textContent = 'Enter text or URL to encode...';
      return;
    }
    const result = encodeURIComponent(input);
    out.textContent = result;
    out.classList.add('success-message');
    setTimeout(() => out.classList.remove('success-message'), 1000);
  });
  
  dec.addEventListener('click', ()=>{
    const input = ta.value || '';
    if (!input) {
      out.textContent = 'Enter encoded URL to decode...';
      return;
    }
    try{ 
      const result = decodeURIComponent(input);
      out.textContent = result;
      out.classList.add('success-message');
      setTimeout(() => out.classList.remove('success-message'), 1000);
    }catch(e){ 
      out.textContent = '❌ Invalid encoded string: ' + e.message;
      out.classList.add('error-message');
      out.classList.add('shake');
      setTimeout(() => {
        out.classList.remove('error-message', 'shake');
      }, 2000);
    }
  });
  
  copyBtn.addEventListener('click', async ()=>{ 
    try{ 
      await navigator.clipboard.writeText(out.textContent || ''); 
      copyBtn.textContent='✓ Copied!'; 
      setTimeout(()=>copyBtn.textContent='Copy to Clipboard', 1500);
    }catch(e){
      copyBtn.textContent='❌ Failed';
      setTimeout(()=>copyBtn.textContent='Copy to Clipboard', 1500);
    } 
  });
}
