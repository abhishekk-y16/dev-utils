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
  initPassword();
  initWordCounter();
  initJSONFormatter();
  initBase64();
  initColor();
  initRegex();
  initTimestamp();
  initURL();

  // Navigation: build simple nav from cards
  const nav = document.getElementById('tool-nav');
  document.querySelectorAll('.card').forEach(card => {
    const btn = document.createElement('button');
    btn.textContent = card.querySelector('h2').textContent;
    btn.addEventListener('click', () => card.scrollIntoView({behavior:'smooth',block:'center'}));
    nav.appendChild(btn);
  });

  // Dark mode toggle
  const toggle = document.getElementById('dark-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('devutils:dark') === '1';
  if (saved) document.documentElement.classList.add('dark');
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('devutils:dark', isDark ? '1' : '0');
  });
});
