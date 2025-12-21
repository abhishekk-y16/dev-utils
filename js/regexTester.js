// Regex tester module
export default function initRegex(){
  const pat = document.getElementById('regex-pattern');
  const flags = document.getElementById('regex-flags');
  const input = document.getElementById('regex-input');
  const out = document.getElementById('regex-output');
  const btn = document.getElementById('regex-test');
  const clear = document.getElementById('regex-clear');

  function highlight(text, re){
    try{
      return text.replace(re, m => `<mark>${m}</mark>`);
    }catch(e){ return text; }
  }

  btn.addEventListener('click', ()=>{
    const p = pat.value || '';
    const f = flags.value || '';
    const txt = input.value || '';
    try{
      const re = new RegExp(p, f.includes('g')?f:f+'g');
      const html = highlight(txt, re);
      out.innerHTML = html;
    }catch(e){ out.textContent = 'Invalid regex: ' + e.message; }
  });
  clear.addEventListener('click', ()=>{ pat.value=''; flags.value=''; input.value=''; out.textContent=''; });
}
