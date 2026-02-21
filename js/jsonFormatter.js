// JSON Formatter module with minify option
export default function initJSONFormatter(){
  const ta = document.getElementById('json-input');
  const out = document.getElementById('json-output');
  const btn = document.getElementById('json-validate');
  const btnMinify = document.getElementById('json-minify');
  const btnCopy = document.getElementById('json-copy');

  btn.addEventListener('click', ()=>{
    const text = ta.value.trim();
    if(!text){ 
      out.textContent = 'Enter JSON to format...'; 
      out.classList.remove('error-message', 'success-message');
      return; 
    }
    try{
      const parsed = JSON.parse(text);
      const pretty = JSON.stringify(parsed, null, 2);
      out.textContent = pretty;
      out.classList.remove('error-message');
      out.classList.add('success-message');
      setTimeout(() => out.classList.remove('success-message'), 1000);
      out.style.animation = 'none';
      setTimeout(() => { out.style.animation = 'fadeInUp 0.3s ease'; }, 10);
    }catch(e){
      out.textContent = '❌ Invalid JSON: ' + e.message;
      out.classList.add('error-message');
      out.classList.remove('success-message');
      out.classList.add('shake');
      setTimeout(() => out.classList.remove('shake'), 500);
    }
  });

  if (btnMinify) {
    btnMinify.addEventListener('click', ()=>{
      const text = ta.value.trim();
      if(!text){ 
        out.textContent = 'Enter JSON to minify...'; 
        return; 
      }
      try{
        const parsed = JSON.parse(text);
        const minified = JSON.stringify(parsed);
        out.textContent = minified;
        out.classList.remove('error-message');
        out.classList.add('success-message');
        setTimeout(() => out.classList.remove('success-message'), 1000);
      }catch(e){
        out.textContent = '❌ Invalid JSON: ' + e.message;
        out.classList.add('error-message');
      }
    });
  }

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
