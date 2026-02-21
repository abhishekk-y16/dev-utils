// Word Counter module with enhanced statistics
export default function initWordCounter(){
  const ta = document.getElementById('word-input');
  const wordsEl = document.getElementById('wc-words');
  const charsEl = document.getElementById('wc-chars');
  const sentEl = document.getElementById('wc-sentences');
  const parasEl = document.getElementById('wc-paragraphs');
  const readingTimeEl = document.getElementById('wc-reading-time');

  function compute(text){
    const chars = text.length;
    const words = (text.trim().match(/\S+/g) || []).length;
    
    // Better sentence detection
    const sentences = (text.match(/[.!?]+(?=\s|$)/g) || []).length;
    
    // Paragraph count (non-empty lines separated by blank lines)
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    
    // Reading time (average 200 words per minute)
    const readingMinutes = Math.ceil(words / 200);
    
    return {chars, words, sentences, paragraphs, readingMinutes};
  }

  function update(){
    const t = ta.value || '';
    const s = compute(t);
    wordsEl.textContent = `Words: ${s.words}`;
    charsEl.textContent = `Chars: ${s.chars}`;
    sentEl.textContent = `Sentences: ${s.sentences}`;
    if (parasEl) parasEl.textContent = `Paragraphs: ${s.paragraphs}`;
    if (readingTimeEl) {
      readingTimeEl.textContent = s.words > 0 
        ? `Reading time: ~${s.readingMinutes} min` 
        : 'Reading time: ~0 min';
    }
  }

  ta.addEventListener('input', update);
  update();
}
