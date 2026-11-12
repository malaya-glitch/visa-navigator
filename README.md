# VisaNavigator ✈️ — Tourist Visa Roadmaps & Mandatory Document Checklists

A modern, responsive web application built with **HTML5, CSS3, and Vanilla JavaScript** that eliminates tourist confusion surrounding foreign visa categories, passport validity regulations, and mandatory entry document preparation.

---

## 🌟 Key Features

### 1. 50+ Popular Tourist Destinations
- Covers **55 top tourist nations** across Asia, Europe (Schengen & Non-Schengen), Americas, Africa, and Oceania.
- Featured destinations include **Thailand, United Arab Emirates (Dubai / Abu Dhabi), United Kingdom, France (Schengen Area), Japan, Singapore**, Italy, Spain, Vietnam, Indonesia (Bali), Switzerland, United States, Australia, and many more.
- Instant search filter by country name, capital city, or popular travel cities (e.g. *Phuket*, *Dubai*, *Kyoto*, *Paris*, *Bali*).

### 2. Visa Category Status Badges
Clear, color-coded visual badges for all major tourist entry categories:
- 🟢 **Visa-Free (30 to 90 Days)** — Instant stamp upon arrival, no advance visa needed.
- 🟡 **Visa on Arrival (VoA)** — Obtain entry permit at the destination airport arrival desk.
- 🔵 **Instant Online eVisa / ETA** — Pre-approved digital travel authorization (24–72 hours).
- 🔴 **Regular Embassy Paper Visa** — In-person appointment, biometric collection, and passport submission.

### 3. Mandatory Document Checklist Generator
- Dynamic generation of all compulsory entry documents:
  - Valid Passport (minimum 6 months validity & blank pages)
  - Confirmed Return / Onward Airline Flight Ticket
  - Proof of Accommodation (Hotel vouchers / Host invitation)
  - 3-Month Bank Statements (Financial solvency proof)
  - Comprehensive Travel & Medical Insurance
  - Destination-specific clearances (e.g. *SG Arrival Card*, *Malaysia MDAC*, *eTravel QR*, *Bali Tourist Tax*)
- **Interactive Checkboxes with LocalStorage Persistence**: Your checked progress is saved across sessions.
- **Readiness Progress Bar**: Real-time percentage indicator (e.g., *"4 of 5 Prepared (80%)"*).
- **Add Custom Documents**: Travelers can add personal items (e.g. *Vaccine card, Child birth certificate, Sponsorship letter*).
- **Print / Save as PDF**: Clean `@media print` formatted printable traveler checklist.
- **Copy to Clipboard**: Instant text summary for trip planning notes.

### 4. Visa Processing Fees & Standard Embassy Timelines
- Transparent government visa fees displayed in USD and local currencies.
- Processing timelines clearly indicated (e.g., *Instant at Border*, *24 to 72 Hours*, *3 to 5 Business Days*, *15 to 20 Working Days*).

### 5. Interactive 6-Month Passport Validity Calculator
- Input your **Passport Expiration Date** and **Planned Travel Departure Date**.
- Instantly verifies compliance with international ICAO 6-month validity standards:
  - 🟢 **Valid**: Safe for international departure.
  - 🟡 **Borderline Warning**: Close to cutoff threshold, early renewal advised.
  - 🔴 **Invalid / Expired**: Warning of strict airline check-in boarding denials.

### 6. Step-by-Step Visa Requirement Roadmaps
- Detailed 5-stage sequential roadmap customized to the visa category:
  1. Passport & Validity Pre-Check
  2. Document Compilation & Verification
  3. Online Submission or Embassy Appointment Booking
  4. Biometrics / Fee Payment
  5. Border Control Clearance & Immigration Stamping

### 7. Origin Passport Selector
- Toggle between origin passports (**United States, United Kingdom, India, Canada, Australia, European Union, Singapore, etc.**) to view realistic, nationality-specific visa exemptions and fees.

### 8. Side-by-Side Country Comparison Tool
- Compare visa categories, processing times, government fees, and document strictness between two destinations side-by-side.

### 9. Modern Travel-Tech UI & Dark Mode
- Built with a clean, modern design inspired by top travel platforms.
- Complete **Dark Mode / Light Mode** toggle with saved preference.
- Keyboard accessible (`/` to focus search, `Esc` to close modal views).

---

## 🚀 How to Run the Application

Because there are **no backend services, build steps, or dependencies required**, running this application is simple and immediate.

### Option A: Open Directly in Any Web Browser
1. Navigate to the project folder:
   ```
   C:\Users\malay\.gemini\antigravity\scratch\visa-navigator
   ```
2. Double-click `index.html` to open it in your default web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

### Option B: Run via a Local HTTP Server (Optional)
If you prefer running via a local server:
```powershell
cd C:\Users\malay\.gemini\antigravity\scratch\visa-navigator
npx serve -l 3000
```
Then open `http://localhost:3000` in your browser.

---

## 📂 Project Directory Structure

```
visa-navigator/
├── index.html            # Semantic HTML5 structure with responsive layouts & modals
├── css/
│   └── styles.css        # Modern CSS styles with light/dark themes and print styles
├── js/
│   ├── data.js           # 55+ tourist destination database with fees, timelines & checklists
│   └── app.js            # Vanilla JS application state, search/filters, calculator & modals
└── README.md             # Project documentation & user guide
```
