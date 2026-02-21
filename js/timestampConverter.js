// Timestamp converter module with current time
export default function initTimestamp(){
  const tsInput = document.getElementById('ts-input');
  const dateInput = document.getElementById('ts-date');
  const toDateBtn = document.getElementById('ts-to-date');
  const toTsBtn = document.getElementById('date-to-ts');
  const nowBtn = document.getElementById('ts-now');
  const output = document.getElementById('ts-output');
  const currentTimestamp = document.getElementById('current-timestamp');
  const currentDate = document.getElementById('current-date');

  function updateCurrentTime() {
    const now = new Date();
    if (currentTimestamp) {
      currentTimestamp.textContent = Math.floor(now.getTime() / 1000);
    }
    if (currentDate) {
      currentDate.textContent = now.toISOString();
    }
  }

  // Update current time every second
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  toDateBtn.addEventListener('click', ()=>{
    const v = Number((tsInput.value||'').trim());
    if(!v && v!==0){ 
      output.textContent='⚠️ Enter numeric timestamp (seconds)'; 
      output.classList.add('error-message');
      setTimeout(() => output.classList.remove('error-message'), 2000);
      return; 
    }
    const d = new Date(v*1000);
    if (isNaN(d.getTime())) {
      output.textContent='⚠️ Invalid timestamp';
      output.classList.add('error-message');
      return;
    }
    output.textContent = `${d.toISOString()}\n\nLocal: ${d.toLocaleString()}`;
    output.classList.remove('error-message');
    output.classList.add('success-message');
    setTimeout(() => output.classList.remove('success-message'), 1000);
  });

  toTsBtn.addEventListener('click', ()=>{
    const v = (dateInput.value||'').trim();
    if(!v){ 
      output.textContent='⚠️ Select a date and time'; 
      output.classList.add('error-message');
      setTimeout(() => output.classList.remove('error-message'), 2000);
      return; 
    }
    const d = new Date(v);
    if(isNaN(d)) { 
      output.textContent='⚠️ Invalid date'; 
      output.classList.add('error-message');
      return; 
    }
    const timestamp = Math.floor(d.getTime()/1000);
    output.textContent = `${timestamp}\n\nMilliseconds: ${d.getTime()}`;
    output.classList.remove('error-message');
    output.classList.add('success-message');
    setTimeout(() => output.classList.remove('success-message'), 1000);
  });
  
  if (nowBtn) {
    nowBtn.addEventListener('click', () => {
      const now = new Date();
      const timestamp = Math.floor(now.getTime() / 1000);
      
      if (tsInput) tsInput.value = timestamp;
      if (dateInput) {
        // Format for datetime-local input
        const offset = now.getTimezoneOffset() * 60000;
        const localDate = new Date(now.getTime() - offset);
        dateInput.value = localDate.toISOString().slice(0, 16);
      }
      
      output.textContent = `Current time loaded:\n${now.toISOString()}\nTimestamp: ${timestamp}`;
      output.classList.add('success-message');
      setTimeout(() => output.classList.remove('success-message'), 1500);
    });
  }
}
