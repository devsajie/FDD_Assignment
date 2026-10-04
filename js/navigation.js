/**
 * APUHACKERX2026 // APU × LBEF STUDENT HACKATHON
 * Navigation System: Responsive Mobile Drawer, Accessibility, Focus Management
 */

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle-btn");
    const closeBtn = document.getElementById("menu-close-btn");
    const drawer = document.getElementById("mobile-drawer");
    const backdrop = document.getElementById("drawer-backdrop");

    if (!toggleBtn || !drawer || !backdrop) return;

    function openDrawer() {
        drawer.classList.add("open");
        backdrop.classList.add("active");
        toggleBtn.setAttribute("aria-expanded", "true");
        drawer.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent background scroll

        // Focus first link inside drawer
        const firstLink = drawer.querySelector("a");
        if (firstLink) firstLink.focus();
    }

    function closeDrawer() {
        drawer.classList.remove("open");
        backdrop.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
        drawer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        toggleBtn.focus();
    }

    toggleBtn.addEventListener("click", () => {
        const isOpen = drawer.classList.contains("open");
        if (isOpen) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeDrawer);
    }

    backdrop.addEventListener("click", closeDrawer);

    // Keyboard ESC to close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.classList.contains("open")) {
            closeDrawer();
        }
    });

    // Close when clicking mobile link
    const mobileLinks = drawer.querySelectorAll(".nav-link");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeDrawer();
        });
    });
});
