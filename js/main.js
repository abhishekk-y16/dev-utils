import initPassword from './passwordGenerator.js';
import initWordCounter from './wordCounter.js';
import initJSONFormatter from './jsonFormatter.js';
import initBase64 from './base64Tool.js';
import initColor from './colorGenerator.js';
import initRegex from './regexTester.js';
import initTimestamp from './timestampConverter.js';
import initURL from './urlEncoder.js';

// Bootstraps all modules and handles small global UI features
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules individually and guard against errors on pages without tool DOM
  try{ initPassword(); }catch(e){ console.warn('initPassword skipped', e); }
  try{ initWordCounter(); }catch(e){ console.warn('initWordCounter skipped', e); }
  try{ initJSONFormatter(); }catch(e){ console.warn('initJSONFormatter skipped', e); }
  try{ initBase64(); }catch(e){ console.warn('initBase64 skipped', e); }
  try{ initColor(); }catch(e){ console.warn('initColor skipped', e); }
  try{ initRegex(); }catch(e){ console.warn('initRegex skipped', e); }
  try{ initTimestamp(); }catch(e){ console.warn('initTimestamp skipped', e); }
  try{ initURL(); }catch(e){ console.warn('initURL skipped', e); }

  // Navigation: build simple nav from cards if no explicit links exist
  const nav = document.getElementById('tool-nav') || document.querySelector('.nav');
  if(nav && nav.children.length === 0){
    document.querySelectorAll('.card').forEach(card => {
      const h = card.querySelector('h2');
      if(!h) return;
      const a = document.createElement('a');
      const slug = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'').trim();
      a.textContent = h.textContent;
      a.href = `#${card.id || slug}`;
      a.addEventListener('click', (e)=>{ e.preventDefault(); card.scrollIntoView({behavior:'smooth',block:'center'}); });
      nav.appendChild(a);
    });
  }

  // Dark mode toggle
  const toggle = document.getElementById('dark-toggle');
  const saved = localStorage.getItem('devutils:dark') === '1';
  if (saved) document.documentElement.classList.add('dark');
  if(toggle){
    toggle.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('devutils:dark', isDark ? '1' : '0');
    });
  }
});
