/**
 * APUHACKERX2026 // APU × LBEF STUDENT HACKATHON
 * Core JavaScript: Countdown, Header Scroll, Reveal Observers, Back-to-Top
 */

document.addEventListener("DOMContentLoaded", () => {
    initHeaderScroll();
    initCountdown();
    initScrollReveal();
    initBackToTop();
    initPerspectiveTilt();
    initAccordion();
});

/**
 * 1. Sticky Header State on Scroll
 */
function initHeaderScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }, { passive: true });
}

/**
 * 2. Live Countdown Timer to Event Launch
 * Target: November 20, 2026 09:00:00 Nepal Standard Time (UTC+5:45)
 */
function initCountdown() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // Fixed future date for the hackathon (Nov 30, 2026)
    const eventDate = new Date("2026-11-30T09:00:00+05:45").getTime();

    function update() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
}

/**
 * 3. Intersection Observer for Scroll Reveals
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (!revealElements.length) return;

    // Respect user's motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealElements.forEach(el => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
}

/**
 * 4. Back-to-Top Button Handler
 */
function initBackToTop() {
    const btn = document.getElementById("backToTopBtn");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    }, { passive: true });

    btn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/**
 * 5. Lightweight 3D Perspective Tilt on Interactive Cards
 */
function initPerspectiveTilt() {
    const cards = document.querySelectorAll(".tilt-card");
    if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });
}

/**
 * 6. Accessible Accordion Controller
 */
function initAccordion() {
    const triggers = document.querySelectorAll(".accordion-trigger");
    if (!triggers.length) return;

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const isExpanded = trigger.getAttribute("aria-expanded") === "true";
            const panel = trigger.nextElementSibling;

            // Close all open panels in the same stack if desired (single expand pattern)
            const stack = trigger.closest(".accordion-stack");
            if (stack) {
                const openTriggers = stack.querySelectorAll('.accordion-trigger[aria-expanded="true"]');
                openTriggers.forEach(openTrigger => {
                    if (openTrigger !== trigger) {
                        openTrigger.setAttribute("aria-expanded", "false");
                        const openPanel = openTrigger.nextElementSibling;
                        if (openPanel) {
                            openPanel.classList.remove("open");
                            openPanel.style.maxHeight = null;
                        }
                    }
                });
            }

            if (isExpanded) {
                trigger.setAttribute("aria-expanded", "false");
                panel.classList.remove("open");
                panel.style.maxHeight = null;
            } else {
                trigger.setAttribute("aria-expanded", "true");
                panel.classList.add("open");
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
}

