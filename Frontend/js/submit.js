/**
 * LEHRERZITATE - Submit Form Handling
 * Form Validation and Submission
 */

// API Configuration (wird aus app.js geerbt)
const SUBMIT_API_BASE_URL = localStorage.getItem('apiUrl') || 'http://localhost:3000/api';

// ============================================
// DOM ELEMENTS (Form-spezifisch)
// ============================================

const submitForm = document.getElementById("submit-form");
const teacherNameInput = document.getElementById("teacher-name");
const subjectInput = document.getElementById("subject");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");
const errorText = document.getElementById("error-text");
const submitBtn = submitForm ? submitForm.querySelector(".submit-btn") : null;

// ============================================
// INITIALIZATION
// ============================================

function initSubmitPage() {
    setupSubmitEventListeners();
    console.log("Submit page initialized");
}

function setupSubmitEventListeners() {
    if (submitForm) {
        submitForm.addEventListener("submit", handleFormSubmit);
    }
}

// ============================================
// FORM HANDLING
// ============================================

function handleFormSubmit(event) {
    event.preventDefault();

    hideMessages();

    const validationError = validateForm();
    if (validationError) {
        showError(validationError);
        return;
    }

    // Get form inputs
    const quoteInput = document.getElementById("quote-text");
    const teacherInput = document.getElementById("teacher-name");
    const subjectInputField = document.getElementById("subject");

    const formData = {
        text: quoteInput.value.trim(),
        teacher: teacherInput.value.trim(),
        subject: subjectInputField.value.trim() || null,
    };

    console.log("Quote submission data:", formData);
    submitQuote(formData);
}

function validateForm() {
    const quoteInput = document.getElementById("quote-text");
    const quoteText = quoteInput.value.trim();
    const teacherName = teacherNameInput.value.trim();

    if (!quoteText) {
        return "Bitte gib das Zitat ein.";
    }
    if (quoteText.length < 10) {
        return "Das Zitat muss mindestens 10 Zeichen lang sein.";
    }
    if (quoteText.length > 500) {
        return "Das Zitat darf nicht länger als 500 Zeichen sein.";
    }

    if (!teacherName) {
        return "Bitte gib den Namen des Lehrers ein.";
    }
    if (teacherName.length < 2) {
        return "Der Lehrername muss mindestens 2 Zeichen lang sein.";
    }
    if (teacherName.length > 100) {
        return "Der Lehrername darf nicht länger als 100 Zeichen sein.";
    }

    const subject = subjectInput.value.trim();
    if (subject && subject.length > 50) {
        return "Das Fach darf nicht länger als 50 Zeichen sein.";
    }

    return null;
}

async function submitQuote(formData) {
    if (!submitBtn) return;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird eingereicht...';

    try {
        const response = await fetch(`${SUBMIT_API_BASE_URL}/quotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok && data.success) {
            showSuccess("✓ Danke für dein Zitat! Es wird bald angezeigt.");
            resetForm();
            
            // Zitate neu laden
            if (typeof loadQuotes === 'function') {
                setTimeout(() => loadQuotes(), 1500);
            }
        } else {
            showError(data.error || "Es gab einen Fehler beim Einreichen.");
        }
    } catch (error) {
        console.error('Submission error:', error);
        showError("Es gab einen Fehler beim Einreichen. Bitte versuche es später erneut.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Zitat einreichen';

        setTimeout(() => {
            hideMessages();
        }, 5000);
    }
}

// ============================================
// FORM UTILITY FUNCTIONS
// ============================================

function resetForm() {
    if (submitForm) {
        submitForm.reset();
        updateSubmitCharCount();
    }
}

function updateSubmitCharCount() {
    const quoteInput = document.getElementById("quote-text");
    const charCountSpan = document.getElementById("char-count");
    if (charCountSpan && quoteInput) {
        const charCount = quoteInput.value.length;
        charCountSpan.textContent = charCount;
    }
}

// ============================================
// MESSAGE DISPLAY
// ============================================

function showSuccess(message) {
    if (errorMessage && successMessage) {
        errorMessage.style.display = "none";
        successMessage.style.display = "flex";
        successMessage.querySelector("p").textContent = message;
    }
}

function showError(message) {
    if (errorMessage && successMessage) {
        successMessage.style.display = "none";
        errorMessage.style.display = "flex";
        errorText.textContent = message;
        console.error("Form error:", message);
    }
}

function hideMessages() {
    if (errorMessage && successMessage) {
        errorMessage.style.display = "none";
        successMessage.style.display = "none";
    }
}

// ============================================
// INITIALIZATION ON PAGE LOAD
// ============================================

document.addEventListener("DOMContentLoaded", initSubmitPage);