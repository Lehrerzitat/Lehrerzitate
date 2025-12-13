// Search, filter and sort logic

// Handle input updates (debounced caller in app.js)
function handleSearchInputs() {
    currentSearchTeacher = (document.getElementById('search-teacher')?.value || '').trim().toLowerCase();
    currentSearchSubject = (document.getElementById('search-subject')?.value || '').trim().toLowerCase();
    currentSearchQuote = (document.getElementById('search-quote')?.value || '').trim().toLowerCase();

    if (currentTab === 'search') {
        applyFiltersAndSort();
    }
}

function handleSort(event) {
    currentSortMode = event.target ? event.target.value : currentSortMode;
    if (currentTab === 'search') {
        applyFiltersAndSort();
    }
}

function applyFiltersAndSort() {
    filteredQuotes = [...allQuotes];

    if (currentTab === 'search') {
        filteredQuotes = filteredQuotes.filter((quote) => {
            const text = (quote.text || '').toLowerCase();
            const teacher = (quote.teacher || '').toLowerCase();
            const subject = (quote.subject || '').toLowerCase();

            const teacherOk = currentSearchTeacher ? teacher.includes(currentSearchTeacher) : true;
            const subjectOk = currentSearchSubject ? subject.includes(currentSearchSubject) : true;

            let quoteOk = true;
            if (currentSearchQuote) {
                const words = currentSearchQuote.split(/\s+/).filter(Boolean);
                quoteOk = words.every(w => {
                    try {
                        const re = new RegExp('\\b' + escapeRegex(w) + '\\b', 'i');
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
    // renderQuotes is defined in ui.js
    if (typeof renderQuotes === 'function') renderQuotes();
}
