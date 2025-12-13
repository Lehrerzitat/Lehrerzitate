// Utility helpers for Lehrerzitate

// Debounce utility
function debounce(fn, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
}

// Escape HTML to prevent XSS when inserting text
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegex(string) {
    return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function adjustBrightness(color, percent) {
    const hex = String(color).replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const newR = Math.max(0, Math.min(255, Math.round(r * (1 + percent))));
    const newG = Math.max(0, Math.min(255, Math.round(g * (1 + percent))));
    const newB = Math.max(0, Math.min(255, Math.round(b * (1 + percent))));

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}
