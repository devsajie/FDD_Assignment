/**
 * APUHACKERX2026 // APU × LBEF STUDENT HACKATHON
 * Form Validation & EmailJS Dispatch Integration
 * Robust client-side validation, inline errors, and accessible states.
 */

// ==========================================================================
// 1. EMAILJS CONFIGURATION
// Replace these with your actual EmailJS credentials from https://emailjs.com
// ==========================================================================
const EMAILJS_CONFIG = {
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    registrationTemplateId: "YOUR_EMAILJS_TEMPLATE_ID_REG",
    contactTemplateId: "YOUR_EMAILJS_TEMPLATE_ID_CONTACT"
};

document.addEventListener("DOMContentLoaded", () => {
    initRegistrationForm();
    initContactForm();
    initCharacterCounters();
});

/**
 * 2. Character Counter for Textareas
 */
function initCharacterCounters() {
    const textareas = document.querySelectorAll("textarea[data-max-chars]");
    textareas.forEach(textarea => {
        const max = parseInt(textarea.getAttribute("data-max-chars"), 10);
        const counterEl = document.getElementById(textarea.id + "-counter");
        if (!counterEl) return;

        function updateCount() {
            const current = textarea.value.length;
            counterEl.textContent = `${current} / ${max} characters`;
            if (current > max) {
                counterEl.style.color = "var(--color-danger)";
            } else {
                counterEl.style.color = "var(--color-text-subtle)";
            }
        }

        textarea.addEventListener("input", updateCount);
        updateCount();
    });
}

/**
 * 3. Registration Form Validation & EmailJS
 */
function initRegistrationForm() {
    const form = document.getElementById("registration-form");
    if (!form) return;

    const statusAlert = document.getElementById("registration-status");
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Clear previous states
        clearAllErrors(form);
        hideStatus(statusAlert);

        // Run validation suite
        const isValid = validateRegistrationFields(form);

        if (!isValid) {
            showStatus(statusAlert, "alert-error", "Please correct the highlighted fields before submitting.");
            // Scroll to first invalid field
            const firstInvalid = form.querySelector(".is-invalid");
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // Processing / Loading State
        setSubmittingState(submitBtn, true, "Transmitting Registration...");
        showStatus(statusAlert, "alert-loading", "Validating team credentials and generating entry token...");

        // Check if real EmailJS keys are configured
        if (EMAILJS_CONFIG.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY" && typeof emailjs !== "undefined") {
            emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.registrationTemplateId, form)
                .then(() => {
                    setSubmittingState(submitBtn, false);
                    showStatus(statusAlert, "alert-success", "🎉 Team registration confirmed! Confirmation dispatched to your leader email.");
                    form.reset();
                })
                .catch((err) => {
                    console.error("EmailJS Error:", err);
                    setSubmittingState(submitBtn, false);
                    showStatus(statusAlert, "alert-error", "Submission error. Please check your network or reach out at apuhackerx2026@lbef.edu.np.");
                });
        } else {
            // Simulated Success for university demonstration / offline assessment
            setTimeout(() => {
                setSubmittingState(submitBtn, false);
                showStatus(
                    statusAlert, 
                    "alert-success", 
                    "✅ [Demo Verification Passed] Team registration successfully validated on the frontend! Your data is formatted and ready for live dispatch once EmailJS keys are set."
                );
                form.reset();
            }, 1200);
        }
    });

    // Real-time blur validation
    attachRealtimeValidation(form);
}

/**
 * 4. Contact Form Validation & EmailJS
 */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const statusAlert = document.getElementById("contact-status");
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearAllErrors(form);
        hideStatus(statusAlert);

        const isValid = validateContactFields(form);

        if (!isValid) {
            showStatus(statusAlert, "alert-error", "Please review all required inquiry fields.");
            const firstInvalid = form.querySelector(".is-invalid");
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        setSubmittingState(submitBtn, true, "Sending Message...");
        showStatus(statusAlert, "alert-loading", "Connecting to organizing committee inbox...");

        if (EMAILJS_CONFIG.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY" && typeof emailjs !== "undefined") {
            emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.contactTemplateId, form)
                .then(() => {
                    setSubmittingState(submitBtn, false);
                    showStatus(statusAlert, "alert-success", "Message received! An organizer will reply within 24 hours.");
                    form.reset();
                })
                .catch(() => {
                    setSubmittingState(submitBtn, false);
                    showStatus(statusAlert, "alert-error", "Could not send message. Please email directly at apuhackerx2026@lbef.edu.np.");
                });
        } else {
            setTimeout(() => {
                setSubmittingState(submitBtn, false);
                showStatus(statusAlert, "alert-success", "✅ [Demo Verification] Inquiry form validated successfully! Ready for live EmailJS credentials.");
                form.reset();
            }, 1000);
        }
    });

    attachRealtimeValidation(form);
}

/**
 * 5. Field Validators & Helpers
 */
function validateRegistrationFields(form) {
    let valid = true;

    // Leader Full Name
    const name = form.querySelector("#leader-name");
    if (name && name.value.trim().length < 3) {
        setFieldError(name, "Please enter full legal name (at least 3 characters).");
        valid = false;
    }

    // Student ID (e.g., NP01CP4S24001 or TP012345)
    const studentId = form.querySelector("#student-id");
    if (studentId && !/^[A-Za-z0-9]{5,15}$/.test(studentId.value.trim())) {
        setFieldError(studentId, "Enter a valid student ID (5-15 alphanumeric characters).");
        valid = false;
    }

    // Email
    const email = form.querySelector("#leader-email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setFieldError(email, "Please provide a valid institutional or personal email address.");
        valid = false;
    }

    // Phone (Nepal / International format)
    const phone = form.querySelector("#leader-phone");
    if (phone && !/^(\+?[0-9]{1,4}[-\s]?)?[0-9]{7,12}$/.test(phone.value.trim())) {
        setFieldError(phone, "Please enter a valid phone number (at least 8 digits).");
        valid = false;
    }

    // Institution
    const inst = form.querySelector("#institution");
    if (inst && !inst.value) {
        setFieldError(inst, "Please select your enrolled institution.");
        valid = false;
    }

    // Team Name
    const team = form.querySelector("#team-name");
    if (team && team.value.trim().length < 2) {
        setFieldError(team, "Team name must be at least 2 characters.");
        valid = false;
    }

    // Team Size (2 to 4)
    const teamSize = form.querySelector("#team-size");
    if (teamSize && (parseInt(teamSize.value, 10) < 2 || parseInt(teamSize.value, 10) > 4)) {
        setFieldError(teamSize, "Teams must consist of 2 to 4 members.");
        valid = false;
    }

    // Track
    const track = form.querySelector("#hack-track");
    if (track && !track.value) {
        setFieldError(track, "Please choose your primary competition track.");
        valid = false;
    }

    // Motivation / Proposal (Max characters)
    const proposal = form.querySelector("#project-proposal");
    if (proposal) {
        if (proposal.value.trim().length < 20) {
            setFieldError(proposal, "Please write a brief summary of what you intend to build (min 20 characters).");
            valid = false;
        } else if (proposal.value.length > 500) {
            setFieldError(proposal, "Summary cannot exceed 500 characters.");
            valid = false;
        }
    }

    // Agreement Checkbox
    const terms = form.querySelector("#terms-agreement");
    if (terms && !terms.checked) {
        setFieldError(terms, "You must agree to the Hackathon Code of Conduct.");
        valid = false;
    }

    return valid;
}

function validateContactFields(form) {
    let valid = true;

    const name = form.querySelector("#contact-name");
    if (name && name.value.trim().length < 2) {
        setFieldError(name, "Please provide your name.");
        valid = false;
    }

    const email = form.querySelector("#contact-email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setFieldError(email, "Please provide a valid email.");
        valid = false;
    }

    const subject = form.querySelector("#contact-subject");
    if (subject && subject.value.trim().length < 3) {
        setFieldError(subject, "Please specify an inquiry topic.");
        valid = false;
    }

    const message = form.querySelector("#contact-message");
    if (message && message.value.trim().length < 10) {
        setFieldError(message, "Message must contain at least 10 characters.");
        valid = false;
    }

    return valid;
}

function setFieldError(field, msg) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");

    const errorEl = document.getElementById(field.id + "-error");
    if (errorEl) {
        errorEl.textContent = msg;
        errorEl.classList.add("visible");
    }
}

function clearFieldError(field) {
    field.classList.remove("is-invalid");
    const errorEl = document.getElementById(field.id + "-error");
    if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("visible");
    }
}

function clearAllErrors(form) {
    const invalidFields = form.querySelectorAll(".is-invalid");
    invalidFields.forEach(f => f.classList.remove("is-invalid"));

    const errorMessages = form.querySelectorAll(".field-error-msg");
    errorMessages.forEach(msg => {
        msg.textContent = "";
        msg.classList.remove("visible");
    });
}

function attachRealtimeValidation(form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            if (input.value.trim().length > 0) {
                clearFieldError(input);
                input.classList.add("is-valid");
            }
        });

        input.addEventListener("input", () => {
            if (input.classList.contains("is-invalid")) {
                clearFieldError(input);
            }
        });
    });
}

function setSubmittingState(btn, isSubmitting, text = "Submitting...") {
    if (!btn) return;
    if (isSubmitting) {
        btn.setAttribute("disabled", "true");
        btn.dataset.originalText = btn.innerHTML;
        btn.innerHTML = `<span>${text}</span>`;
    } else {
        btn.removeAttribute("disabled");
        if (btn.dataset.originalText) {
            btn.innerHTML = btn.dataset.originalText;
        }
    }
}

function showStatus(alertEl, typeClass, message) {
    if (!alertEl) return;
    alertEl.className = `form-status-alert active ${typeClass}`;
    alertEl.textContent = message;
}

function hideStatus(alertEl) {
    if (!alertEl) return;
    alertEl.className = "form-status-alert";
    alertEl.textContent = "";
}
