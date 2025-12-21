// Timestamp converter module
export default function initTimestamp(){
  const tsInput = document.getElementById('ts-input');
  const dateInput = document.getElementById('ts-date');
  const toDateBtn = document.getElementById('ts-to-date');
  const toTsBtn = document.getElementById('date-to-ts');
  const output = document.getElementById('ts-output');

  toDateBtn.addEventListener('click', ()=>{
    const v = Number((tsInput.value||'').trim());
    if(!v && v!==0){ output.textContent='Enter numeric timestamp (seconds)'; return; }
    const d = new Date(v*1000);
    output.textContent = d.toISOString();
  });

  toTsBtn.addEventListener('click', ()=>{
    const v = (dateInput.value||'').trim();
    if(!v){ output.textContent='Enter date (YYYY-MM-DDTHH:MM:SS)'; return; }
    const d = new Date(v);
    if(isNaN(d)) { output.textContent='Invalid date'; return; }
    output.textContent = Math.floor(d.getTime()/1000);
  });
}
