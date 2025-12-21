// small helpers file
export function clamp(n, a, b){ return Math.min(Math.max(n,a),b); }
export function isEmpty(s){ return !s || s.trim().length===0; }