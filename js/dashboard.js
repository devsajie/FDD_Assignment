/**
 * APUHACKERX2026 // APU × LBEF STUDENT HACKATHON
 * Demo Participant Dashboard: Tabs, Live Checklist Progress, Submission Mock
 */

document.addEventListener("DOMContentLoaded", () => {
    initDashboardTabs();
    initChecklistProgress();
    initSubmissionMock();
});

/**
 * 1. Dashboard Tab Switcher
 */
function initDashboardTabs() {
    const tabButtons = document.querySelectorAll(".dash-tab-btn");
    const tabPanes = document.querySelectorAll(".dash-tab-pane");

    if (!tabButtons.length || !tabPanes.length) return;

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-tab");

            tabButtons.forEach(b => b.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));

            btn.classList.add("active");
            const targetPane = document.getElementById(targetId);
            if (targetPane) targetPane.classList.add("active");
        });
    });
}

/**
 * 2. Team Readiness Checklist: Dynamic Progress Calculator
 */
function initChecklistProgress() {
    const checkboxes = document.querySelectorAll(".task-checkbox");
    const progressFill = document.getElementById("checklist-progress-bar");
    const progressText = document.getElementById("checklist-percentage-text");
    const completedCountText = document.getElementById("checklist-completed-count");

    if (!checkboxes.length) return;

    function recalculate() {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percent = Math.round((checked / total) * 100);

        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressText) progressText.textContent = `${percent}% Complete`;
        if (completedCountText) completedCountText.textContent = `${checked} of ${total} tasks fulfilled`;
    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", recalculate);
    });

    recalculate();
}

/**
 * 3. Submission Mock Handler
 */
function initSubmissionMock() {
    const form = document.getElementById("mock-submission-form");
    const alertBox = document.getElementById("submission-alert");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const repoUrl = form.querySelector("#repo-url").value.trim();
        const demoUrl = form.querySelector("#demo-url").value.trim();

        if (!repoUrl.startsWith("http")) {
            alertBox.className = "form-status-alert active alert-error";
            alertBox.textContent = "Please enter a valid GitHub repository URL starting with https://";
            return;
        }

        alertBox.className = "form-status-alert active alert-loading";
        alertBox.textContent = "Generating cryptographic submission hash...";

        setTimeout(() => {
            alertBox.className = "form-status-alert active alert-success";
            alertBox.innerHTML = `
                <strong>🚀 Submission Received!</strong><br>
                Artifact Hash: <code>0x8f2d9c1b4e6a</code><br>
                Recorded at: ${new Date().toLocaleTimeString()} NPT. Ready for preliminary jury evaluation.
            `;
        }, 1000);
    });
}
