# ???? Bharat Connect — Next Generation National Portal of India

> **"One Nation. One Digital Gateway. Every Citizen Connected."**

A complete front-end redesign of india.gov.in built for the **WebGov Redesign** UI/UX competition.

---

## ?? Quick Start

**No installation required.** Just open `index.html` in your browser.

Or serve locally:
```bash
# Python 3
python -m http.server 8080
# Then visit: http://localhost:8080
```

---

## ?? Project Structure

```
bharat-connect/
+-- index.html                    ? Homepage (start here)
+-- README.md
+-- src/
¦   +-- styles/main.css           ? Shared design system
¦   +-- js/
¦   ¦   +-- main.js               ? Shared interactions & Bharat AI
¦   ¦   +-- data.js               ? Mock data (schemes, ministries, states)
¦   +-- pages/
¦       +-- search.html           ? Smart Search & Citizen Intent Engine
¦       +-- schemes.html          ? Bharat Scheme Finder (3-step wizard)
¦       +-- guide.html            ? Guide Me (step-by-step journeys)
¦       +-- dashboard.html        ? My Bharat Dashboard
¦       +-- services.html         ? Documents & Service Hub
¦       +-- ministries.html       ? Ministries & Departments Directory
¦       +-- states.html           ? State Services (Interactive India Map)
¦       +-- news.html             ? News & Government Updates
¦       +-- explore.html          ? Spotlight & Explore India
¦       +-- help.html             ? Help & Support + Bharat AI
¦       +-- accessibility.html    ? Accessibility Center
```

---

## ? Key Features

### ?? Citizen Intent Engine
Natural language search on search.html:
- "I am a student and need financial help"
- "I want to start a small business"
- "I am a farmer looking for crop insurance"

### ?? Bharat Scheme Finder
3-step wizard: Who are you ? Your details ? Your schemes

### ??? Guide Me
6 complete government service journeys (scholarship, startup, birth certificate, ration card, farmer loan, pension)

### ?? Bharat AI Assistant
Floating chat widget on every page. Ask about any government service.

### ??? Interactive India Map
Click any state/UT on states.html to discover local services and schemes.

### ? Accessibility Center
Full WCAG 2.1 AA compliance — text size, contrast, screen reader, keyboard nav.

---

## ?? Design System

| Element | Value |
|---|---|
| Primary | #0D2137 (Deep Navy) |
| Accent 1 | #FF9933 (Saffron) |
| Accent 2 | #138808 (India Green) |
| Font | Inter + Noto Sans Devanagari |

---

## ?? Competition Notes

**Project**: Bharat Connect — WebGov Redesign Competition
**Stack**: Pure HTML5 + CSS3 + Vanilla JavaScript (no build tools)
**External CDNs**: Google Fonts, Lucide Icons

Key Differentiators:
1. Citizen Intent Engine — Natural language ? government service discovery
2. Guide Me — Complete step-by-step service journeys
3. Bharat Scheme Finder — Personalized scheme wizard
4. Privacy-First Dashboard — localStorage only, no server data
5. Full Accessibility — WCAG 2.1 AA compliant
6. Tricolor Design Identity — Dignified government aesthetic

---

*Developed for the WebGov Redesign Competition — Digital India Programme*
*A reimagining of india.gov.in*
