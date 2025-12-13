// UI helpers: rendering quote cards and pages

// Renders the For You page by loading quotes and rendering them
function renderForYouPage() {
    // loadQuotes is defined in app.js
    loadQuotes().then(() => {
        filteredQuotes = [...allQuotes];
        sortQuotes(filteredQuotes, 'newest');
        renderQuotes();
    });
}

// Renders the currently active quotes into the appropriate container
function renderQuotes() {
    const quotesContainer = document.getElementById('quotes-container');
    const searchResultsContainer = document.getElementById('search-results-container');
    const noQuotesMessage = document.getElementById('no-quotes-message');

    const container = currentTab === 'search' ? searchResultsContainer : quotesContainer;

    if (!container) return;

    if (filteredQuotes.length === 0) {
        if (quotesContainer) quotesContainer.innerHTML = '';
        if (noQuotesMessage) noQuotesMessage.style.display = 'block';
        container.innerHTML = '';
        return;
    }

    if (noQuotesMessage) noQuotesMessage.style.display = 'none';

    container.innerHTML = filteredQuotes.map(q => createQuoteCard(q)).join('');
}

// Create the HTML for a quote card. Uses escapeHtml from utils.js
function createQuoteCard(quote) {
    const upvoteClass = quote.userVote === 'up' ? 'active' : '';
    const downvoteClass = quote.userVote === 'down' ? 'active' : '';

    return `
        <div class="quote" data-quote-id="${quote.id}">
            <div class="text">${escapeHtml(quote.text)}</div>
            <div class="meta">
                ${escapeHtml(quote.teacher)}
                ${quote.subject ? `<span class="quote-subject">${escapeHtml(quote.subject)}</span>` : ''}
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
