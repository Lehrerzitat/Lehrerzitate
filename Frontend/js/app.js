/**
 * LEHRERZITATE - Main Application
 * Professional Quote Browser with Tab Navigation
 */

// ============================================
// DUMMY DATA
// ============================================

const dummyQuotes = [
    {
        id: 1,
        text: "Wenn ihr nicht schweigen könnt, müsst ihr mindestens leise sein!",
        teacher: "Herr Müller",
        subject: "Mathematik",
        upvotes: 342,
        downvotes: 15,
        date: "2025-01-10",
        userVote: null,
    },
    {
        id: 2,
        text: "Das ist kein Kindergarten, das ist eine Schule!",
        teacher: "Frau Schmidt",
        subject: "Deutsch",
        upvotes: 456,
        downvotes: 8,
        date: "2025-01-09",
        userVote: null,
    },
    {
        id: 3,
        text: "Ich habe euch 20 Minuten Zeit gegeben, und ihr seid noch nicht mal fertig mit lesen!",
        teacher: "Herr Weber",
        subject: "Geschichte",
        upvotes: 289,
        downvotes: 12,
        date: "2025-01-08",
        userVote: null,
    },
    {
        id: 4,
        text: "Das ist die letzte Chance, sonst gibt es Hausaufgaben!",
        teacher: "Frau Müller",
        subject: "Englisch",
        upvotes: 512,
        downvotes: 22,
        date: "2025-01-07",
        userVote: null,
    },
    {
        id: 5,
        text: "Wenn ich euch nochmal erwische, rufe ich eure Eltern an!",
        teacher: "Herr Fischer",
        subject: "Biologie",
        upvotes: 378,
        downvotes: 18,
        date: "2025-01-06",
        userVote: null,
    },
    {
        id: 6,
        text: "Das wird die wichtigste Stunde dieses Schuljahres!",
        teacher: "Frau Kaufmann",
        subject: "Chemie",
        upvotes: 421,
        downvotes: 25,
        date: "2025-01-05",
        userVote: null,
    },
    {
        id: 7,
        text: "Mathematik ist wie Atmen – man kann nicht ohne atmen!",
        teacher: "Herr Müller",
        subject: "Mathematik",
        upvotes: 198,
        downvotes: 45,
        date: "2025-01-04",
        userVote: null,
    },
    {
        id: 8,
        text: "Das hätte jeder von euch wissen müssen!",
        teacher: "Frau Wagner",
        subject: "Physik",
        upvotes: 267,
        downvotes: 31,
        date: "2025-01-03",
        userVote: null,
    },
    {
        id: 9,
        text: "Im Winter fahren wir nicht ins Freibad!",
        teacher: "Herr Winter",
        subject: "Sport",
        upvotes: 423,
        downvotes: 12,
        date: "2025-01-02",
        userVote: null,
    },
    {
        id: 10,
        text: "Bitte konzentriert euch auf die Aufgabe!",
        teacher: "Frau Bauer",
        subject: "Kunst",
        upvotes: 234,
        downvotes: 5,
        date: "2025-01-01",
        userVote: null,
    },
    {
        id: 11,
        text: "Das ist keine Pizza-Pause, das ist Unterricht!",
        teacher: "Herr Schneider",
        subject: "Musik",
        upvotes: 567,
        downvotes: 19,
        date: "2024-12-31",
        userVote: null,
    },
    {
        id: 12,
        text: "Wer das nicht versteht, sollte zuhören!",
        teacher: "Frau Hoffmann",
        subject: "Deutsch",
        upvotes: 312,
        downvotes: 14,
        date: "2024-12-30",
        userVote: null,
    },
];

// ============================================
// STATE MANAGEMENT
// ============================================

let allQuotes = [];
let filteredQuotes = [];
let currentSortMode = "newest";
let currentSearchQuery = "";
let currentSearchTeacher = "";
let currentSearchSubject = "";
let currentSearchQuote = "";
let currentTab = "for-you";
let currentTheme = localStorage.getItem("theme") || "light";
let currentAccentColor = localStorage.getItem("accentColor") || "#4a69bd";
let isLoadingQuotes = false;

// Generiere oder hole User-ID für Vote-Tracking
function getUserId() {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
}

const CURRENT_USER_ID = getUserId();

// ============================================
// INITIALIZATION
// ============================================

function initApp() {
    loadQuotes();
    setupEventListeners();
    applyAccentColor(currentAccentColor);
    renderForYouPage();
    console.log("✓ App initialized");
}

// Debounce utility for input handlers
// debounce moved to js/utils.js

function setupEventListeners() {
    // Tab Navigation - Desktop
    const navLinksDesktop = document.querySelectorAll(".nav-link-desktop[data-tab]");
    navLinksDesktop.forEach(link => {
        link.addEventListener("click", handleTabChange);
    });

    // Tab Navigation - Mobile
    const navLinksMobile = document.querySelectorAll(".nav-link-mobile[data-tab]");
    navLinksMobile.forEach(link => {
        link.addEventListener("click", handleTabChange);
    });

    // Desktop More Menu
    setupDesktopMoreMenu();

    // Mobile More Menu
    setupMobileMoreMenu();

    // Search and sort
    const searchTeacherInput = document.getElementById("search-teacher");
    const searchSubjectInput = document.getElementById("search-subject");
    const searchQuoteInput = document.getElementById("search-quote");
    const sortSelect = document.getElementById("sort-select");
    const quotesContainer = document.getElementById("quotes-container");
    const searchResultsContainer = document.getElementById("search-results-container");
    const quoteTextInput = document.getElementById("quote-text");

    // Debounced search to improve performance while typing
    const debouncedSearch = debounce(handleSearchInputs, 250);
    if (searchTeacherInput) searchTeacherInput.addEventListener("input", debouncedSearch);
    if (searchSubjectInput) searchSubjectInput.addEventListener("input", debouncedSearch);
    if (searchQuoteInput) searchQuoteInput.addEventListener("input", debouncedSearch);
    if (sortSelect) sortSelect.addEventListener("change", handleSort);
    if (quotesContainer) quotesContainer.addEventListener("click", handleVoteButtonClick);
    if (searchResultsContainer) searchResultsContainer.addEventListener("click", handleVoteButtonClick);
    if (quoteTextInput) quoteTextInput.addEventListener("input", updateCharCount);

    // On touch devices use pointerdown to make voting feel instant
    if (quotesContainer && window.PointerEvent) {
        quotesContainer.addEventListener('pointerdown', (e) => {
            // Only handle touch/pen pointers
            if (e.pointerType !== 'touch' && e.pointerType !== 'pen') return;

            const btn = e.target.closest('.vote-button');
            if (!btn) return;

            // Prevent native focus that some browsers apply on touch
            try { btn.blur(); } catch (err) {}

            // Mark to skip the following click (to avoid double processing)
            btn.dataset.skipClick = '1';

            // Perform optimistic vote immediately (reuse logic similar to click handler)
            const quoteId = parseInt(btn.dataset.quoteId);
            const voteType = btn.dataset.vote;

            try {
                const quoteEl = document.querySelector(`.quote[data-quote-id='${quoteId}']`);
                if (quoteEl) {
                    const upBtn = quoteEl.querySelector('.vote-button.upvote');
                    const downBtn = quoteEl.querySelector('.vote-button.downvote');
                    const upCountEl = upBtn.querySelector('.vote-count');
                    const downCountEl = downBtn.querySelector('.vote-count');

                    const upCount = parseInt(upCountEl.textContent || '0');
                    const downCount = parseInt(downCountEl.textContent || '0');

                    if (voteType === 'up') {
                        if (btn.classList.contains('active')) {
                            btn.classList.remove('active');
                            upCountEl.textContent = Math.max(0, upCount - 1);
                        } else {
                            btn.classList.add('active');
                            upCountEl.textContent = upCount + 1;
                            if (downBtn.classList.contains('active')) {
                                downBtn.classList.remove('active');
                                downCountEl.textContent = Math.max(0, downCount - 1);
                            }
                        }
                    } else if (voteType === 'down') {
                        if (btn.classList.contains('active')) {
                            btn.classList.remove('active');
                            downCountEl.textContent = Math.max(0, downCount - 1);
                        } else {
                            btn.classList.add('active');
                            downCountEl.textContent = downCount + 1;
                            if (upBtn.classList.contains('active')) {
                                upBtn.classList.remove('active');
                                upCountEl.textContent = Math.max(0, upCount - 1);
                            }
                        }
                    }
                }
            } catch (err) {
                // ignore
            }

            // Trigger the real vote logic
            toggleVote(quoteId, voteType);

            // Remove skip flag shortly after to allow future clicks
            setTimeout(() => { try { delete btn.dataset.skipClick; } catch (e) {} }, 600);
        }, { passive: true });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", handleDarkModeToggle);
        // Set initial state
        darkModeToggle.checked = currentTheme === "dark";
    }

    // On touch devices, ensure vote buttons do not remain focused after tapping
    document.addEventListener('touchend', (e) => {
        try {
            const active = document.activeElement;
            if (active && active.classList && active.classList.contains('vote-button')) {
                active.blur();
            }
        } catch (err) {
            // ignore
        }
    }, {passive: true});

    // Clear filters button (if present)
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const t = document.getElementById('search-teacher');
            const s = document.getElementById('search-subject');
            const q = document.getElementById('search-quote');
            const sort = document.getElementById('sort-select');
            if (t) t.value = '';
            if (s) s.value = '';
            if (q) q.value = '';
            if (sort) sort.value = 'newest';
            currentSearchTeacher = '';
            currentSearchSubject = '';
            currentSearchQuote = '';
            currentSortMode = 'newest';
            applyFiltersAndSort();
            if (t) t.focus();
        });
    }

    // Initialize theme
    applyTheme(currentTheme);
}

function handleSearchInputs(e) {
    currentSearchTeacher = (document.getElementById('search-teacher')?.value || '').trim().toLowerCase();
    currentSearchSubject = (document.getElementById('search-subject')?.value || '').trim().toLowerCase();
    currentSearchQuote = (document.getElementById('search-quote')?.value || '').trim().toLowerCase();

    if (currentTab === 'search') {
        applyFiltersAndSort();
    }
}

function setupDesktopMoreMenu() {
    const moreBtn = document.querySelector("[data-toggle='more-menu']");
    const moreMenu = document.getElementById("more-menu");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    if (!moreBtn || !moreMenu) return;

    moreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        moreMenu.classList.toggle("active");
        moreBtn.classList.toggle("active");
    });

    dropdownItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            handlePageNavigation(item.getAttribute("data-page"));
            moreMenu.classList.remove("active");
            moreBtn.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-more-desktop")) {
            moreMenu.classList.remove("active");
            moreBtn.classList.remove("active");
        }
    });
}

function setupMobileMoreMenu() {
    const moreBtnMobile = document.querySelector("[data-toggle='more-menu-mobile']");
    const moreMenuMobile = document.getElementById("more-menu-mobile");
    const dropdownItemsMobile = document.querySelectorAll(".dropdown-item-mobile");

    if (!moreBtnMobile || !moreMenuMobile) return;

    moreBtnMobile.addEventListener("click", (e) => {
        e.preventDefault();
        moreMenuMobile.classList.toggle("active");
        moreBtnMobile.classList.toggle("active");
    });

    dropdownItemsMobile.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            handlePageNavigation(item.getAttribute("data-page"));
            moreMenuMobile.classList.remove("active");
            moreBtnMobile.classList.remove("active");
        });
    });
}

// ============================================
// TAB NAVIGATION
// ============================================

function handleTabChange(event) {
    event.preventDefault();
    const tabName = event.currentTarget.getAttribute("data-tab");
    switchTab(tabName);
}

function switchTab(tabName) {
    const tabContents = document.querySelectorAll(".tab-content");
    const navLinksDesktop = document.querySelectorAll(".nav-link-desktop[data-tab]");
    const navLinksMobile = document.querySelectorAll(".nav-link-mobile[data-tab]");

    // Hide all tabs
    tabContents.forEach(tab => tab.classList.remove("active"));

    // Show active tab
    const activeTab = document.getElementById(tabName + "-tab");
    if (activeTab) {
        activeTab.classList.add("active");
    }

    // Update navigation state (desktop)
    navLinksDesktop.forEach(link => {
        if (link.getAttribute("data-tab") === tabName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Update navigation state (mobile)
    navLinksMobile.forEach(link => {
        if (link.getAttribute("data-tab") === tabName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    currentTab = tabName;

    // Load tab-specific content
    if (tabName === "for-you") {
        renderForYouPage();
    }
    // When switching to search tab, ensure filters are applied and results shown
    if (tabName === "search") {
        applyFiltersAndSort();
    }

    console.log(`Switched to ${tabName} tab`);
}

// ============================================
// PAGE NAVIGATION (Info, Settings, About)
// ============================================

function handlePageNavigation(pageName) {
    console.log(`Navigating to ${pageName} page`);
    
    switch(pageName) {
        case "info":
            switchToPage("info");
            break;
        case "settings":
            switchToPage("settings");
            break;
        case "about":
            switchToPage("about");
            break;
        case "privacy":
            switchToPage("privacy");
            break;
        case "imprint":
            switchToPage("imprint");
            break;
    }
}

function switchToPage(pageName) {
    const tabContents = document.querySelectorAll(".tab-content");
    
    // Hide all tabs
    tabContents.forEach(tab => tab.classList.remove("active"));

    // Show active page
    const activePage = document.getElementById(pageName + "-tab");
    if (activePage) {
        activePage.classList.add("active");
    }

    currentTab = pageName;

    // Load page-specific content
    if (pageName === "settings") {
        initSettingsPage();
    }

    console.log(`Switched to ${pageName} page`);
}

// ============================================
// FOR YOU PAGE - QUOTE FEED
// ============================================

function renderForYouPage() {
    loadQuotes().then(() => {
        filteredQuotes = [...allQuotes];
        sortQuotes(filteredQuotes, "newest");
        renderQuotes();
    });
}

async function loadQuotes() {
    if (isLoadingQuotes) return;
    
    try {
        isLoadingQuotes = true;
        const quotesContainer = document.getElementById("quotes-container");
        if (quotesContainer) {
            quotesContainer.innerHTML = '<p class="loading">Lade Zitate...</p>';
        }

        // Verwende Dummy-Daten
        allQuotes = dummyQuotes.map(quote => ({
            ...quote,
            userVote: null
        }));

        console.log(`✅ ${allQuotes.length} Zitate geladen`);

        // Nutzer-Votes laden
        await loadUserVotes();
        
    } catch (error) {
        console.error('Fehler beim Laden der Zitate:', error);
        const quotesContainer = document.getElementById("quotes-container");
        if (quotesContainer) {
            quotesContainer.innerHTML = '<p class="error-message">Fehler beim Laden der Zitate. Bitte versuchen Sie es später erneut.</p>';
        }
    } finally {
        isLoadingQuotes = false;
    }
}

async function loadUserVotes() {
    // Diese Funktion könnte später implementiert werden, um User-Votes vom Server zu laden
    // Für jetzt speichern wir sie lokal
    const userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
    
    allQuotes.forEach(quote => {
        const voteKey = `quote_${quote.id}`;
        if (userVotes[voteKey]) {
            quote.userVote = userVotes[voteKey];
        }
    });
}

function renderQuotes() {
    const quotesContainer = document.getElementById("quotes-container");
    const searchResultsContainer = document.getElementById("search-results-container");
    const noQuotesMessage = document.getElementById("no-quotes-message");
    
    const container = currentTab === "search" ? searchResultsContainer : quotesContainer;

    if (filteredQuotes.length === 0) {
        if (quotesContainer) quotesContainer.innerHTML = "";
        if (noQuotesMessage) noQuotesMessage.style.display = "block";
        return;
    }

    if (noQuotesMessage) noQuotesMessage.style.display = "none";
    container.innerHTML = filteredQuotes
        .map((quote) => createQuoteCard(quote))
        .join("");
}

function createQuoteCard(quote) {
    const upvoteClass = quote.userVote === "up" ? "active" : "";
    const downvoteClass = quote.userVote === "down" ? "active" : "";

    return `
        <div class="quote" data-quote-id="${quote.id}">
            <div class="text">${escapeHtml(quote.text)}</div>
            
            <div class="meta">
                ${escapeHtml(quote.teacher)}
                ${
                    quote.subject
                        ? `<span class="quote-subject">${escapeHtml(quote.subject)}</span>`
                        : ""
                }
            </div>

            <div class="quote-actions">
                <button class="vote-button upvote ${upvoteClass}" data-vote="up" data-quote-id="${quote.id}">
                    👍 <span class="vote-count">${quote.upvotes}</span>
                </button>
                <button class="vote-button downvote ${downvoteClass}" data-vote="down" data-quote-id="${quote.id}">
                    👎 <span class="vote-count">${quote.downvotes}</span>
                </button>
            </div>
        </div>
    `;
}

// ============================================
// SEARCH & FILTER
// ============================================

function handleSearch(event) {
    currentSearchQuery = event.target.value.toLowerCase();
    
    // Nur im Search-Tab filtern
    if (currentTab === "search") {
        applyFiltersAndSort();
    }
}

function handleSort(event) {
    currentSortMode = event.target.value;
    
    // Nur im Search-Tab sortieren
    if (currentTab === "search") {
        applyFiltersAndSort();
    }
}

function applyFiltersAndSort() {
    filteredQuotes = [...allQuotes];

    // Nur Suchfilter im Search-Tab anwenden
    if (currentTab === "search") {
        filteredQuotes = filteredQuotes.filter((quote) => {
            const text = quote.text.toLowerCase();
            const teacher = (quote.teacher || '').toLowerCase();
            const subject = (quote.subject || '').toLowerCase();

            // Teacher filter: partial match
            const teacherOk = currentSearchTeacher ? teacher.includes(currentSearchTeacher) : true;

            // Subject filter: partial match
            const subjectOk = currentSearchSubject ? subject.includes(currentSearchSubject) : true;

            // Quote filter: require all words to appear as whole words in the quote text
            let quoteOk = true;
            if (currentSearchQuote) {
                const words = currentSearchQuote.split(/\s+/).filter(Boolean);
                quoteOk = words.every(w => {
                    try {
                        const re = new RegExp(`\\b${escapeRegex(w)}\\b`, 'i');
                        return re.test(text);
                    } catch (err) {
                        return text.includes(w);
                    }
                });
            }

            return teacherOk && subjectOk && quoteOk;
        });
    }

    sortQuotes(filteredQuotes, currentSortMode);
    renderQuotes();
}

// escapeHtml, escapeRegex, pickRandom, shuffleArray, adjustBrightness
// have been moved to js/utils.js to keep app.js concise and modular.
// Use those helpers directly.

function sortQuotes(quotes, mode) {
    switch (mode) {
        case "popular":
            quotes.sort((a, b) => {
                const aScore = a.upvotes - a.downvotes;
                const bScore = b.upvotes - b.downvotes;
                return bScore - aScore;
            });
            break;

        case "oldest":
            quotes.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            break;

        case "newest":
        default:
            quotes.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
    }
}

// ============================================
// VOTING
// ============================================

function handleVoteButtonClick(event) {
    const button = event.target.closest(".vote-button");
    if (!button) return;

    // If a pointerdown already handled this touch, skip the click to avoid double-toggle
    if (button.dataset && button.dataset.skipClick) {
        try { delete button.dataset.skipClick; } catch (e) {}
        return;
    }

    const quoteId = parseInt(button.dataset.quoteId);
    const voteType = button.dataset.vote;

    // Optimistic UI update: update classes and counts immediately so touch shows correct color
    try {
        const quoteEl = document.querySelector(`.quote[data-quote-id='${quoteId}']`);
        if (quoteEl) {
            const upBtn = quoteEl.querySelector('.vote-button.upvote');
            const downBtn = quoteEl.querySelector('.vote-button.downvote');
            const upCountEl = upBtn.querySelector('.vote-count');
            const downCountEl = downBtn.querySelector('.vote-count');

            const upCount = parseInt(upCountEl.textContent || '0');
            const downCount = parseInt(downCountEl.textContent || '0');

            if (voteType === 'up') {
                if (button.classList.contains('active')) {
                    // undo upvote
                    button.classList.remove('active');
                    upCountEl.textContent = Math.max(0, upCount - 1);
                } else {
                    // apply upvote
                    button.classList.add('active');
                    upCountEl.textContent = upCount + 1;
                    // remove down if set
                    if (downBtn.classList.contains('active')) {
                        downBtn.classList.remove('active');
                        downCountEl.textContent = Math.max(0, downCount - 1);
                    }
                }
            } else if (voteType === 'down') {
                if (button.classList.contains('active')) {
                    // undo downvote
                    button.classList.remove('active');
                    downCountEl.textContent = Math.max(0, downCount - 1);
                } else {
                    // apply downvote
                    button.classList.add('active');
                    downCountEl.textContent = downCount + 1;
                    // remove up if set
                    if (upBtn.classList.contains('active')) {
                        upBtn.classList.remove('active');
                        upCountEl.textContent = Math.max(0, upCount - 1);
                    }
                }
            }
        }
    } catch (err) {
        // ignore optimistic update errors
    }

    toggleVote(quoteId, voteType);

    // Remove focus from the button to avoid sticky accent background on touch devices
    try {
        // blur works for buttons; use setTimeout to ensure it runs after any native focus handling
        setTimeout(() => {
            if (button && typeof button.blur === 'function') button.blur();
        }, 0);
    } catch (err) {
        // ignore
    }
}

// ============================================
// FORM HELPERS
// ============================================

function updateCharCount() {
    const charCountSpan = document.getElementById("char-count");
    const quoteTextInput = document.getElementById("quote-text");
    if (charCountSpan && quoteTextInput) {
        const charCount = quoteTextInput.value.length;
        charCountSpan.textContent = charCount;
    }
}

// ============================================
// THEME & SETTINGS
// ============================================

function handleDarkModeToggle(event) {
    const isDarkMode = event.target.checked;
    currentTheme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
}

function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }
}

function initSettingsPage() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.checked = currentTheme === "dark";
    }

    // Initialize color picker if it exists
    const colorOptions = document.querySelectorAll(".color-option input[type='radio']");
    colorOptions.forEach(option => {
        option.addEventListener("change", handleAccentColorChange);
        // Set the checked state based on current color
        if (option.value === currentAccentColor) {
            option.checked = true;
        }
    });

    // Initialize reset button
    const resetBtn = document.querySelector(".reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", handleResetSettings);
    }
}

function handleResetSettings() {
    // Reset to default theme (light)
    currentTheme = "light";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);

    // Reset to default accent color (blue)
    currentAccentColor = "#4a69bd";
    localStorage.setItem("accentColor", currentAccentColor);
    applyAccentColor(currentAccentColor);

    // Update UI
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.checked = false;
    }

    const colorOptions = document.querySelectorAll(".color-option input[type='radio']");
    colorOptions.forEach(option => {
        option.checked = option.value === "#4a69bd";
    });

    console.log("Settings reset to defaults");
}

function handleAccentColorChange(event) {
    currentAccentColor = event.target.value;
    localStorage.setItem("accentColor", currentAccentColor);
    applyAccentColor(currentAccentColor);
}

function applyAccentColor(color) {
    document.documentElement.style.setProperty("--primary-color", color);
    // For darker shade
    const darker = adjustBrightness(color, -0.2);
    document.documentElement.style.setProperty("--primary-dark", darker);
}

// adjustBrightness moved to js/utils.js

// ============================================
// URL HASH NAVIGATION
// ============================================

function handleHashNavigation() {
    const hash = (location.hash || '').replace('#', '').trim();
    if (!hash) return;

    // map some common hash variants to internal pages/tabs
    const pageMap = {
        'for-you': 'for-you',
        'home': 'for-you',
        'search': 'search',
        'submit': 'submit',
        'info': 'info',
        'settings': 'settings',
        'about': 'about',
        'privacy': 'privacy',
        'datenschutz': 'privacy',
        'imprint': 'imprint',
        'impressum': 'imprint'
    };

    const target = pageMap[hash];
    if (!target) return;

    // if it's a main tab (for-you/search/submit) use switchTab, else switchToPage
    if (['for-you', 'search', 'submit'].includes(target)) {
        switchTab(target);
    } else {
        switchToPage(target);
    }
}

// Listen for hash changes so links like index.html#privacy work while app is open
window.addEventListener('hashchange', () => {
    handleHashNavigation();
});

// ============================================
// START APPLICATION
// ============================================

// Wait for loader.js to load components
window.addEventListener('componentsLoaded', () => {
    initApp();
    // After init, handle any hash in the URL (e.g. index.html#privacy)
    handleHashNavigation();
    console.log("✓ Components loaded and app initialized");
});
