// Regex tester module - XSS vulnerability fixed
export default function initRegex(){
  const pat = document.getElementById('regex-pattern');
  const flagsInput = document.getElementById('regex-flags');
  const input = document.getElementById('regex-input');
  const out = document.getElementById('regex-output');
  const btn = document.getElementById('regex-test');
  const clear = document.getElementById('regex-clear');
  const matchCount = document.getElementById('regex-match-count');
  
  // Flag checkboxes
  const flagG = document.getElementById('regex-flag-g');
  const flagI = document.getElementById('regex-flag-i');
  const flagM = document.getElementById('regex-flag-m');

  // Update flags input when checkboxes change
  function updateFlags() {
    let flags = '';
    if (flagG?.checked) flags += 'g';
    if (flagI?.checked) flags += 'i';
    if (flagM?.checked) flags += 'm';
    if (flagsInput) flagsInput.value = flags;
  }

  [flagG, flagI, flagM].forEach(checkbox => {
    checkbox?.addEventListener('change', updateFlags);
  });

  // HTML escape function to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function highlight(text, re){
    try{
      // Escape HTML first to prevent XSS
      const escaped = escapeHtml(text);
      // Then add mark tags for matches
      return escaped.replace(re, m => `<mark>${m}</mark>`);
    }catch(e){ 
      return escapeHtml(text); 
    }
  }

  btn.addEventListener('click', ()=>{
    const p = pat.value || '';
    const f = flagsInput.value || '';
    const txt = input.value || '';
    
    if (!p) {
      out.textContent = 'Please enter a regex pattern';
      if (matchCount) matchCount.textContent = '';
      return;
    }
    
    try{
      const re = new RegExp(p, f.includes('g') ? f : f + 'g');
      const matches = txt.match(re);
      const count = matches ? matches.length : 0;
      
      const html = highlight(txt, re);
      out.innerHTML = html;
      
      if (matchCount) {
        matchCount.textContent = count > 0 ? `${count} match${count !== 1 ? 'es' : ''}` : '';
      }
      
      // Add success animation
      out.style.animation = 'none';
      setTimeout(() => { out.style.animation = 'fadeInUp 0.3s ease'; }, 10);
    }catch(e){ 
      out.textContent = 'Invalid regex: ' + e.message;
      out.classList.add('error-message');
      setTimeout(() => out.classList.remove('error-message'), 2000);
      if (matchCount) matchCount.textContent = '';
    }
  });

  clear.addEventListener('click', ()=>{ 
    pat.value = ''; 
    if (flagG) flagG.checked = true;
    if (flagI) flagI.checked = false;
    if (flagM) flagM.checked = false;
    updateFlags();
    input.value = ''; 
    out.textContent = '';
    if (matchCount) matchCount.textContent = '';
  });
  
  // Initialize flags
  updateFlags();
}
