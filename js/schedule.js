/**
 * APUHACKERX2026 // APU × LBEF STUDENT HACKATHON
 * Interactive Timetable: Day Tabs, Category Chips & Live Keyword Filter
 */

document.addEventListener("DOMContentLoaded", () => {
    initScheduleFilter();
});

function initScheduleFilter() {
    const dayButtons = document.querySelectorAll(".day-tab-btn");
    const categoryPills = document.querySelectorAll(".category-pill");
    const searchInput = document.getElementById("schedule-search");
    const rows = document.querySelectorAll(".schedule-row");

    if (!rows.length) return;

    let activeDay = "day-1";
    let activeCategory = "all";
    let searchQuery = "";

    function filterRows() {
        let matchCount = 0;

        rows.forEach(row => {
            const rowDay = row.getAttribute("data-day");
            const rowCategory = row.getAttribute("data-category");
            const rowText = row.textContent.toLowerCase();

            const matchesDay = (activeDay === "all" || rowDay === activeDay);
            const matchesCategory = (activeCategory === "all" || rowCategory === activeCategory);
            const matchesSearch = (!searchQuery || rowText.includes(searchQuery));

            if (matchesDay && matchesCategory && matchesSearch) {
                row.style.display = "";
                matchCount++;
            } else {
                row.style.display = "none";
            }
        });

        // Show/hide empty state
        const emptyState = document.getElementById("schedule-empty-state");
        if (emptyState) {
            emptyState.style.display = matchCount === 0 ? "block" : "none";
        }
    }

    // Day switch handler
    dayButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            dayButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeDay = btn.getAttribute("data-day");
            filterRows();
        });
    });

    // Category switch handler
    categoryPills.forEach(pill => {
        pill.addEventListener("click", () => {
            categoryPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            activeCategory = pill.getAttribute("data-category");
            filterRows();
        });
    });

    // Search filter input handler
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            filterRows();
        });
    }

    // Initial filter run
    filterRows();
}
