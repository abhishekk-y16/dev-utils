import initPassword from './passwordGenerator.js';
import initWordCounter from './wordCounter.js';
import initJSONFormatter from './jsonFormatter.js';
import initBase64 from './base64Tool.js';
import initColor from './colorGenerator.js';
import initRegex from './regexTester.js';
import initTimestamp from './timestampConverter.js';
import initURL from './urlEncoder.js';

// Optimized bootstrapping - only initializes relevant modules based on current page
document.addEventListener('DOMContentLoaded', () => {
  // Detect current page from URL
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Map pages to their initializer functions
  const pageModules = {
    'password.html': initPassword,
    'wordcounter.html': initWordCounter,
    'json.html': initJSONFormatter,
    'base64.html': initBase64,
    'color.html': initColor,
    'regex.html': initRegex,
    'timestamp.html': initTimestamp,
    'url.html': initURL
  };
  
  // Initialize only the relevant module for this page
  const initFn = pageModules[currentPage];
  if (initFn) {
    try {
      initFn();
    } catch(e) {
      console.error(`Failed to initialize ${currentPage}:`, e);
      showError('Tool initialization failed. Please refresh the page.');
    }
  }
  
  // Update active nav link
  updateActiveNavLink();
  
  // Dark mode toggle
  initDarkMode();
  
  // Add keyboard shortcuts
  initKeyboardShortcuts();
});

// Update active navigation link based on current page
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// Dark mode initialization with smooth transition
function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  if (!toggle) return;
  
  const saved = localStorage.getItem('devutils:dark') === '1';
  if (saved) {
    document.documentElement.classList.add('dark');
    toggle.textContent = '☀️';
  }
  
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('devutils:dark', isDark ? '1' : '0');
    toggle.textContent = isDark ? '☀️' : '🌙';
    
    // Add a subtle animation
    toggle.style.transform = 'rotate(360deg)';
    setTimeout(() => { toggle.style.transform = ''; }, 300);
  });
}

// Global keyboard shortcuts
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Focus search/input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const input = document.querySelector('textarea, input[type="text"]');
      if (input) input.focus();
    }
    
    // Escape: Clear focused input
    if (e.key === 'Escape') {
      const focused = document.activeElement;
      if (focused && (focused.tagName === 'TEXTAREA' || focused.tagName === 'INPUT')) {
        focused.blur();
      }
    }
  });
}

// Utility function to show error messages
function showError(message) {
  const container = document.querySelector('.container');
  if (!container) return;
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.marginBottom = '1rem';
  errorDiv.textContent = message;
  container.insertBefore(errorDiv, container.firstChild);
  
  setTimeout(() => errorDiv.remove(), 5000);
}

