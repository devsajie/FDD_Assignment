/**
 * APUHACKERX2026 // APU × LBEF STUDENT HACKATHON
 * Editorial Gallery & Accessible Lightbox Modal
 */

document.addEventListener("DOMContentLoaded", () => {
    initGalleryFilters();
    initLightbox();
});

let currentGalleryImages = [];
let currentImageIndex = 0;

/**
 * 1. Category Filtering
 */
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll(".gallery-filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            galleryItems.forEach(item => {
                const category = item.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });

            // Update visible images cache for lightbox navigation
            updateVisibleImages();
        });
    });

    updateVisibleImages();
}

function updateVisibleImages() {
    currentGalleryImages = Array.from(document.querySelectorAll(".gallery-item")).filter(
        item => item.style.display !== "none"
    );
}

/**
 * 2. Lightbox Modal Logic
 */
function initLightbox() {
    const modal = document.getElementById("lightbox-modal");
    if (!modal) return;

    const modalImg = document.getElementById("lightbox-img");
    const modalCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    function openLightbox(index) {
        if (!currentGalleryImages[index]) return;
        currentImageIndex = index;

        const item = currentGalleryImages[index];
        const img = item.querySelector("img");
        const caption = item.getAttribute("data-caption") || img.getAttribute("alt") || "";

        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.textContent = caption;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    }

    function closeLightbox() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        openLightbox(currentImageIndex);
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        openLightbox(currentImageIndex);
    }

    // Bind clicks to items
    const allItems = document.querySelectorAll(".gallery-item");
    allItems.forEach((item) => {
        item.addEventListener("click", () => {
            updateVisibleImages();
            const index = currentGalleryImages.indexOf(item);
            if (index !== -1) {
                openLightbox(index);
            }
        });

        // Accessibility: allow Enter key
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                item.click();
            }
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", showNext);
    if (prevBtn) prevBtn.addEventListener("click", showPrev);

    // Click backdrop to close
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;

        if (e.key === "Escape") {
            closeLightbox();
        } else if (e.key === "ArrowRight") {
            showNext();
        } else if (e.key === "ArrowLeft") {
            showPrev();
        }
    });
}
