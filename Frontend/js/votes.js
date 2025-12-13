// Voting logic and persistence

function loadUserVotes() {
    const userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
    if (!allQuotes) return;
    allQuotes.forEach(quote => {
        const voteKey = `quote_${quote.id}`;
        if (userVotes[voteKey]) {
            quote.userVote = userVotes[voteKey];
        } else {
            quote.userVote = null;
        }
    });
}

function saveUserVote(quoteId, voteType) {
    const key = `quote_${quoteId}`;
    const userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
    if (voteType) {
        userVotes[key] = voteType;
    } else {
        delete userVotes[key];
    }
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
}

function toggleVote(quoteId, voteType) {
    const quote = allQuotes.find(q => q.id === quoteId);
    if (!quote) return;

    // If same vote, remove it
    if (quote.userVote === voteType) {
        if (voteType === 'up') {
            quote.upvotes = Math.max(0, quote.upvotes - 1);
        } else if (voteType === 'down') {
            quote.downvotes = Math.max(0, quote.downvotes - 1);
        }
        quote.userVote = null;
        saveUserVote(quoteId, null);
    } else {
        // Remove previous vote if present
        if (quote.userVote === 'up') {
            quote.upvotes = Math.max(0, quote.upvotes - 1);
        } else if (quote.userVote === 'down') {
            quote.downvotes = Math.max(0, quote.downvotes - 1);
        }

        // Apply new vote
        if (voteType === 'up') {
            quote.upvotes = (quote.upvotes || 0) + 1;
        } else if (voteType === 'down') {
            quote.downvotes = (quote.downvotes || 0) + 1;
        }
        quote.userVote = voteType;
        saveUserVote(quoteId, voteType);
    }

    // Keep filteredQuotes in sync
    const f = filteredQuotes.find(q => q.id === quoteId);
    if (f) Object.assign(f, quote);

    // Re-render to ensure counts are consistent
    if (typeof renderQuotes === 'function') renderQuotes();
}
