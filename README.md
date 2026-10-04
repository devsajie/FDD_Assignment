# APUHACKERX2026 // APU × LBEF STUDENT HACKATHON

> **BUILD. BREAK. REPEAT.**  
> *48 Hours of Ideas, Code & Real-World Problems.*

Official frontend repository for **APUHACKERX2026**, a collaborative student hackathon jointly organized by **Lord Buddha Education Foundation (LBEF)** (Kathmandu, Nepal) and **Asia Pacific University of Technology & Innovation (APU)** (Kuala Lumpur, Malaysia).

Created as an academic submission for the university module **CT053-3-1 Fundamentals of Web Design and Development (FDD) Group Assignment**.

---

## 📅 Key Event Dates & Deadlines

- **Registration Deadline:** November 20, 2026 (23:59 NPT)
- **Cohort Announcement:** November 24, 2026
- **Hackathon Kickoff:** Monday, November 30, 2026 at 09:00 NPT
- **Opening Keynote & Hacking Commences:** Monday, November 30, 2026 at 17:00 NPT
- **Hard Code Freeze:** Wednesday, December 2, 2026 at 12:00 NPT
- **Grand Finale & Awards:** Wednesday, December 2, 2026 at 16:00 NPT
- **Venue:** LBEF Campus, Maitidevi Marg, Kathmandu 44600, Nepal

---

## ⚡ Technical Stack & Architecture

This website strictly adheres to university assignment constraints with **zero backend frameworks, zero external CSS frameworks, and zero frontend runtime libraries**. Everything runs directly in the client browser using pure, standards-compliant web technologies:

* **HTML5:** Semantic markup (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`), fully accessible ARIA landmarks, meta viewport tags, and Open Graph protocol tags.
* **CSS3:** Custom architecture built with pure CSS:
  * CSS Custom Properties (CSS variables) for full theme control
  * Modern CSS Grid and Flexbox layouts
  * Fluid responsive typography using `clamp()`
  * Hardware-accelerated micro-interactions and transitions
  * Zero reliance on Bootstrap, Tailwind, or Bulma.
* **Vanilla JavaScript (ES6+):** Pure modular JavaScript:
  * Dynamic live countdown timer targeting kickoff date
  * Responsive mobile drawer navigation with accessibility traps
  * Client-side form validation with regex patterns and accessible error alerts
  * Dynamic team member row addition/removal in registration
  * Interactive schedule tab switcher and track filtering
  * Filterable gallery with full-screen modal lightbox
  * Interactive sprint readiness checklist with live completion percentage
  * Mock participant dashboard with multi-tab state management
  * Zero reliance on React, Vue, Angular, or jQuery.
* **External Third-Party Services (Allowed & Integrated):**
  * **EmailJS SDK:** Client-side form dispatch for registration and contact messages
  * **Google Fonts:** `Sora` (Headings), `Inter` (Body Text), `IBM Plex Mono` (Technical labels/timestamps)
  * **Google Maps Embed:** Accessible interactive map iframe for campus directions.

---

## 🎨 Visual Identity & Design System

The visual design delivers a distinct, high-energy university engineering identity (**Cool Dark University-Tech**) rather than a generic corporate AI template:

* **Color Tokens:**
  * Primary Canvas: `#080D18` (Deep midnight navy)
  * Surface Cards: `#101827` (Card and panel backgrounds)
  * Elevated Containers: `#152033` (Modals and high-contrast containers)
  * Structural Borders: `#1F293D` (Subtle boundary definition)
  * Accent Primary: `#2563EB` (Electric academic blue)
  * Accent Secondary: `#22D3EE` (Technical cyan)
  * Highlight Accent: `#C7F36B` (High-voltage lime yellow)
  * Primary Typography: `#F8FAFC` (Pure crisp white)
  * Muted Typography: `#94A3B8` (Legible secondary text)
* **Responsive Breakpoints:**
  * Desktop Navigation: Viewports above `1240px` feature an expansive 11-page inline navbar with active states and quick registration action.
  * Mobile/Tablet: Under `1240px`, transitions into an accessible off-canvas drawer navigation.

---

## 📂 Project Structure & Pages

The web application contains **12 fully interconnected pages**:

```text
├── index.html            # Main landing page: hero, live countdown, highlights, tracks preview, timeline
├── about.html            # About the initiative, LBEF × APU collaboration, student organizing committee
├── activities.html       # Hackathon tracks, detailed problem briefs, full rulebook, judging criteria
├── schedule.html         # 48-Hour interactive timetable (Nov 30 – Dec 02) with day/track filters & ICS calendar
├── registration.html     # Interactive team registration form (2-4 members) with real-time validation & EmailJS
├── resources.html        # Starter kits, downloadable PDFs, API cheatsheets, and project starter packs
├── gallery.html          # Masonry image gallery with tag filters, photo lightbox modal, and video showcase
├── news.html             # Press releases, partnership announcements, compute credit notifications
├── faq.html              # Frequently Asked Questions organized as accessible accordion panels
├── sponsors.html         # Tiered sponsorship breakdown, partner logos, perks matrix, prospectus download
├── contact.html          # Campus location map, transit guides, direct inquiry form, emergency helplines
├── dashboard.html        # Live participant portal mock with schedule milestones & dynamic readiness checklist
│
├── css/
│   ├── style.css         # Core stylesheet: color variables, typography, navigation, buttons, footer
│   ├── responsive.css    # Media queries (1240px, 992px, 768px, 480px) and mobile drawer mechanics
│   └── animations.css    # Keyframes, hover transitions, ticker animation, pulse indicators
│
├── js/
│   ├── main.js           # Live countdown timer, back-to-top button, header elevation scroll listener
│   ├── navigation.js     # Responsive mobile drawer menu toggle, keyboard accessibility, active states
│   ├── forms.js          # Dynamic team member adding/removing, regex form validation, EmailJS integration
│   ├── schedule.js       # Day tab switching, category track filtering, simulated ICS calendar download
│   ├── gallery.js        # Filter buttons, image lightbox modal with keyboard navigation
│   └── dashboard.js      # Participant dashboard tab controller & real-time progress percentage calculator
│
└── assets/               # Downloadable hackathon resource materials
    ├── APUHACKERX2026-Participant-Handbook.pdf
    ├── APUHACKERX2026-Official-Rules.pdf
    ├── APUHACKERX2026-Sponsor-Prospectus.pdf
    ├── APUHACKERX2026-Pitch-Template.pptx
    ├── APUHACKERX2026-API-Starter-Pack.zip
    └── APUHACKERX2026-Branding-Kit.zip
```

---

## 🚀 How to Run the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devsajie/FDD_Assignment.git
   cd FDD_Assignment
   ```
2. **Open in browser:**
   - Double-click `index.html` to open directly in any modern browser, or
   - Use VS Code **Live Server** extension (`Right-click index.html -> Open with Live Server`).
3. **EmailJS Setup (Optional for Production Form Delivery):**
   - The registration and contact forms include ready-to-use EmailJS boilerplate.
   - To send actual emails to your inbox, insert your public key, service ID, and template ID in `js/forms.js` and in the `<script>` header of `registration.html` and `contact.html`:
     ```javascript
     window.EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
     emailjs.init(window.EMAILJS_PUBLIC_KEY);
     ```

---

## 👥 Academic Credits & Attribution

* **Module:** CT053-3-1 Fundamentals of Web Design and Development (FDD)
* **Institutions:** Lord Buddha Education Foundation (LBEF Campus, Nepal) in academic partnership with Asia Pacific University of Technology & Innovation (APU, Malaysia)
* **Author / Developer:** Sajie Devkota ([@devsajie](https://github.com/devsajie))
* **License:** MIT License — Free for educational and non-commercial reference.
