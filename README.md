# Victim Intake Case Manager

A secure intake and reporting management app for MLM, crypto scam, and online fraud victims.

Built with:
- Next.js
- TypeScript
- Tailwind CSS
- LocalStorage persistence

---

# Live Website

Deployed Application:

https://victim-intake-app.vercel.app

---

# Purpose

This application helps organize:
- victim intake forms
- blockchain transaction evidence
- TXIDs and wallet addresses
- screenshots and PDFs
- scam timelines
- withdrawal problems
- fee/tax demands
- disappearing website behavior
- complaint submission tracking

The app is designed to help elderly victims and families organize reports and complete official complaint submissions step-by-step.

---

# Features

## Victim Intake Forms
Create individual reports for each victim including:
- contact information
- platform/company information
- amount deposited
- TXIDs
- wallet addresses
- scam timelines
- withdrawal issues
- fee/tax demands
- supporting evidence notes

---

## Evidence Uploads
Upload:
- screenshots
- PDFs
- chat messages
- blockchain proof
- training materials

Evidence is stored locally in the browser.

---

## Private Report Access
Each victim report has:
- an individual access code
- an admin override code

Victims cannot access other victim reports.

---

## Guided Complaint Steps

Step-by-step reporting guides for:
- FTC
- BBB Scam Tracker
- FBI / IC3
- Philippines reporting agencies
- Canada reporting agencies

Designed to be elderly-friendly and easy to follow.

---

## Complaint Progress Tracking
Track whether complaints were submitted to:
- FTC
- BBB
- FBI / IC3
- Philippines agencies
- Canadian agencies

Each report includes a visual progress bar.

---

## Backup & Restore
Admin-only tools:
- export all reports as JSON backup
- import reports from backup

---

# Project Structure

```text
app/
├── page.tsx
├── new/page.tsx
├── reports/page.tsx
├── cases/[id]/page.tsx
├── guides/
│   ├── ftc/page.tsx
│   ├── bbb/page.tsx
│   ├── ic3/page.tsx
│   ├── philippines/page.tsx
│   └── canada/page.tsx
```

---

# Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Future Improvements

Planned features:
- Supabase database
- authentication
- encrypted evidence storage
- search and filters
- cleaner PDF export
- evidence categorization
- country-specific complaint routing
- cloud backup
- multi-admin support

---

# Important Notice

This project is intended for organizational and reporting assistance only.

Users should:
- use official reporting websites only
- avoid sharing sensitive passwords or seed phrases
- avoid paying “recovery” companies claiming guaranteed recovery

This application does not provide legal or financial advice.

---

# License

Private internal project.
