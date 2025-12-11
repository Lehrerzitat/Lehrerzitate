/**
 * SETTINGS PAGE - Dark Mode & Accent Color Management
 */

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEYS = {
    DARK_MODE: 'lehrerzitate_dark_mode',
    ACCENT_COLOR: 'lehrerzitate_accent_color'
};

// ============================================
// DEFAULT VALUES
// ============================================

const DEFAULTS = {
    darkMode: false,
    accentColor: '#4a69bd'
};

// ============================================
// INITIALIZATION
// ============================================

function initSettings() {
    loadSettings();
    setupSettingsEventListeners();
    applySettings();
    console.log("✓ Settings initialized");
}

// ============================================
// LOAD SETTINGS FROM STORAGE
// ============================================

function loadSettings() {
    const darkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
    const accentColor = localStorage.getItem(STORAGE_KEYS.ACCENT_COLOR) || DEFAULTS.accentColor;

    return {
        darkMode,
        accentColor
    };
}

// ============================================
// SAVE SETTINGS TO STORAGE
// ============================================

function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, settings.darkMode);
    localStorage.setItem(STORAGE_KEYS.ACCENT_COLOR, settings.accentColor);
}

// ============================================
// APPLY SETTINGS
// ============================================

function applySettings() {
    const settings = loadSettings();
    
    // Apply Dark Mode
    if (settings.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    // Apply Accent Color
    document.documentElement.style.setProperty('--primary-color', settings.accentColor);
    updateAccentColorVariants(settings.accentColor);
}

// ============================================
// UPDATE ACCENT COLOR VARIANTS
// ============================================

function updateAccentColorVariants(hexColor) {
    const rgb = hexToRgb(hexColor);
    
    // Calculate darker shade for primary-dark
    const darker = adjustBrightness(hexColor, -20);
    
    document.documentElement.style.setProperty('--primary-color', hexColor);
    document.documentElement.style.setProperty('--primary-dark', darker);
}

// ============================================
// COLOR UTILITIES
// ============================================

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function adjustBrightness(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;

    rgb.r = Math.max(0, Math.min(255, Math.round(rgb.r * (1 + percent / 100))));
    rgb.g = Math.max(0, Math.min(255, Math.round(rgb.g * (1 + percent / 100))));
    rgb.b = Math.max(0, Math.min(255, Math.round(rgb.b * (1 + percent / 100))));

    return rgbToHex(rgb.r, rgb.g, rgb.b);
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================

function setupSettingsEventListeners() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const accentColorOptions = document.querySelectorAll('input[name="accent-color"]');
    const resetBtn = document.getElementById('reset-settings-btn');

    const settings = loadSettings();

    // Set initial toggle state
    if (darkModeToggle) {
        darkModeToggle.checked = settings.darkMode;
        darkModeToggle.addEventListener('change', handleDarkModeToggle);
    }

    // Set initial color selection
    accentColorOptions.forEach(option => {
        if (option.value === settings.accentColor) {
            option.checked = true;
        }
        option.addEventListener('change', handleAccentColorChange);
    });

    // Reset button
    if (resetBtn) {
        resetBtn.addEventListener('click', handleResetSettings);
    }
}

// ============================================
// EVENT HANDLERS
// ============================================

function handleDarkModeToggle(event) {
    const settings = loadSettings();
    settings.darkMode = event.target.checked;
    saveSettings(settings);
    applySettings();
    console.log(`Dark Mode: ${settings.darkMode ? 'ON' : 'OFF'}`);
}

function handleAccentColorChange(event) {
    const settings = loadSettings();
    settings.accentColor = event.target.value;
    saveSettings(settings);
    applySettings();
    console.log(`Accent Color changed to: ${settings.accentColor}`);
}

function handleResetSettings() {
    if (confirm('Möchtest du wirklich alle Einstellungen zurücksetzen?')) {
        localStorage.removeItem(STORAGE_KEYS.DARK_MODE);
        localStorage.removeItem(STORAGE_KEYS.ACCENT_COLOR);
        
        // Reset UI
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        const accentColorOptions = document.querySelectorAll('input[name="accent-color"]');
        
        if (darkModeToggle) darkModeToggle.checked = DEFAULTS.darkMode;
        accentColorOptions.forEach(option => {
            option.checked = option.value === DEFAULTS.accentColor;
        });

        applySettings();
        console.log("✓ Settings reset to defaults");
    }
}

// ============================================
// INITIALIZATION ON COMPONENT LOAD
// ============================================

window.addEventListener('componentsLoaded', () => {
    initSettings();
});