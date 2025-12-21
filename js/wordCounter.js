// Word Counter module
export default function initWordCounter(){
  const ta = document.getElementById('word-input');
  const wordsEl = document.getElementById('wc-words');
  const charsEl = document.getElementById('wc-chars');
  const sentEl = document.getElementById('wc-sentences');

  function compute(text){
    const chars = text.length;
    const words = (text.trim().match(/\S+/g) || []).length;
    const sentences = (text.match(/[.!?]+/g) || []).length;
    return {chars,words,sentences};
  }

  function update(){
    const t = ta.value || '';
    const s = compute(t);
    wordsEl.textContent = `Words: ${s.words}`;
    charsEl.textContent = `Chars: ${s.chars}`;
    sentEl.textContent = `Sentences: ${s.sentences}`;
  }

  ta.addEventListener('input', update);
  update();
}
