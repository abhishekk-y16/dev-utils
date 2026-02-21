// Password Generator module with strength meter
export default function initPassword(){
  const len = document.getElementById('pw-length');
  const upper = document.getElementById('pw-upper');
  const lower = document.getElementById('pw-lower');
  const numbers = document.getElementById('pw-numbers');
  const symbols = document.getElementById('pw-symbols');
  const output = document.getElementById('pw-output');
  const btnGen = document.getElementById('pw-generate');
  const btnCopy = document.getElementById('pw-copy');
  const lengthDisplay = document.getElementById('pw-length-display');
  const strengthIndicator = document.getElementById('pw-strength');

  // Update length display when slider changes
  if (len && lengthDisplay) {
    len.addEventListener('input', () => {
      lengthDisplay.textContent = len.value;
    });
  }

  function calculateStrength(password) {
    if (!password) return null;
    let score = 0;
    
    // Length score
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    
    // Complexity score
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    if (score <= 3) return 'weak';
    if (score <= 5) return 'medium';
    return 'strong';
  }

  function updateStrengthIndicator(password) {
    if (!strengthIndicator) return;
    
    const strength = calculateStrength(password);
    strengthIndicator.className = 'strength-indicator';
    
    if (strength === 'weak') {
      strengthIndicator.classList.add('strength-weak');
      strengthIndicator.textContent = '⚠️ Weak Password';
    } else if (strength === 'medium') {
      strengthIndicator.classList.add('strength-medium');
      strengthIndicator.textContent = '⚡ Medium Strength';
    } else if (strength === 'strong') {
      strengthIndicator.classList.add('strength-strong');
      strengthIndicator.textContent = '✓ Strong Password';
    } else {
      strengthIndicator.textContent = '';
    }
  }

  function generatePassword(){
    const size = Math.max(4, Math.min(128, Number(len.value) || 16));
    let pool = '';
    if(upper.checked) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(lower.checked) pool += 'abcdefghijklmnopqrstuvwxyz';
    if(numbers.checked) pool += '0123456789';
    if(symbols.checked) pool += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if(!pool) {
      if (strengthIndicator) {
        strengthIndicator.textContent = '⚠️ Select at least one character type';
        strengthIndicator.className = 'strength-indicator strength-weak';
      }
      return '';
    }
    // build password using secure RNG
    const pwChars = [];
    const bytes = new Uint32Array(size);
    crypto.getRandomValues(bytes);
    for(let i=0;i<size;i++) pwChars.push(pool[bytes[i] % pool.length]);
    return pwChars.join('');
  }

  btnGen.addEventListener('click', ()=>{ 
    const password = generatePassword();
    output.value = password;
    updateStrengthIndicator(password);
    output.style.animation = 'none';
    setTimeout(() => { output.style.animation = 'fadeInUp 0.3s ease'; }, 10);
  });
  
  btnCopy.addEventListener('click', async ()=>{
    try{ 
      await navigator.clipboard.writeText(output.value || ''); 
      btnCopy.textContent='✓ Copied!'; 
      btnCopy.classList.add('success');
      setTimeout(()=>{
        btnCopy.textContent='Copy to Clipboard';
        btnCopy.classList.remove('success');
      }, 1500); 
    }catch(e){
      btnCopy.textContent='❌ Failed';
      setTimeout(()=>btnCopy.textContent='Copy to Clipboard', 1500);
    }
  });
  
  // Generate initial password
  const initialPassword = generatePassword();
  if (output) output.value = initialPassword;
  updateStrengthIndicator(initialPassword);
}
