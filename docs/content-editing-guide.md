# HonSoc Website Content Editing Guide
*A Non-Technical Reference for Society Officers & Web Editors*

Welcome to the Honor Society website content management guide. The website is configured so that all organization data—officers, merchandise, financial transparency reports, academic accomplishments, hall of fame registries, and event photography—lives in simple JSON data files inside the `src/content/` folder.

You do not need to edit HTML, CSS, or React code to update these records.

---

## Table of Contents
1. [Where Content Lives](#1-where-content-lives)
2. [How to Edit Content Safely](#2-how-to-edit-content-safely)
3. [Section-by-Section Schema Guides](#3-section-by-section-schema-guides)
   - [Officers (`officers.json`)](#officers-officersjson)
   - [Financial Transparency (`financial-report.json`)](#financial-transparency-financial-reportjson)
   - [Hall of Fame (`hall-of-fame.json`)](#hall-of-fame-hall-of-famejson)
   - [Accomplishments (`accomplishments.json`)](#accomplishments-accomplishmentsjson)
   - [Merchandise (`merch.json`)](#merchandise-merchjson)
   - [Gallery (`gallery.json`)](#gallery-galleryjson)
4. [Validating Your Edits (Self-Check)](#4-validating-your-edits-self-check)
5. [Troubleshooting Common Validation Errors](#5-troubleshooting-common-validation-errors)

---

## 1. Where Content Lives

All editable files are located in `src/content/`:

| Section | File Path | Responsible Officer / Committee |
| :--- | :--- | :--- |
| **Officers Directory** | `src/content/officers.json` | Secretariat / HR Committee |
| **Financial Transparency** | `src/content/financial-report.json` | Treasury Committee / Auditor |
| **Hall of Fame** | `src/content/hall-of-fame.json` | Academics Committee / Registrar Liaison |
| **Accomplishments** | `src/content/accomplishments.json` | Project Heads / Vice President |
| **Merchandise Store** | `src/content/merch.json` | Ways & Means / Finance |
| **Event Gallery** | `src/content/gallery.json` | Creatives / Public Relations |

---

## 2. How to Edit Content Safely

### Golden Rules of JSON
1. **Always use straight double quotes** (`"value"`), never single quotes (`'value'`) or curly quotes (`“value”`).
2. **No trailing commas** after the last element in a list `[...]` or object `{...}`.
3. **Numbers do not have quotes** (e.g., `"feePerStudent": 150`, not `"150"`).
4. **Booleans are lowercase** (`true` or `false`, no quotes).

---

## 3. Section-by-Section Schema Guides

### Officers (`officers.json`)
List of current chapter officers.

```json
[
  {
    "id": "officer-pres",
    "name": "Maria Santos",
    "position": "President",
    "committee": "Executive Board",
    "program": "BS Computer Science",
    "photo": "/images/officers/maria-santos.webp",
    "order": 1
  }
]
```
- `name` *(string, required)*: Full name.
- `position` *(string, required)*: Executive role title.
- `committee` *(string, optional)*: Committee name if applicable.
- `program` *(string, required)*: Degree program.
- `photo` *(string, required)*: Image file path in `public/images/officers/`.
- `order` *(integer, required)*: Sort order (1 appears first).

---

### Financial Transparency (`financial-report.json`)
Term-by-term breakdown of collected society dues and fund allocations.

```json
[
  {
    "semester": "1st Semester, AY 2025-2026",
    "feePerStudent": 150,
    "totalCollected": 37500,
    "studentCount": 250,
    "status": "pending",
    "note": "Interim budget awaiting student assembly audit signoff.",
    "breakdown": [
      {
        "category": "Academic Reviewers & Mock Boards",
        "amount": 15000,
        "percent": 40,
        "description": "Printing and honoraria for mock licensure exams."
      }
    ]
  }
]
```
- `status` *(string)*: Must be either `"official"` or `"pending"`.
  - When set to `"pending"`, the website automatically displays an amber disclaimer banner stating figures are unfinalized.
- `breakdown` *(array)*: Each item requires `category`, `amount` (number), `percent` (0–100), and `description`.

---

### Hall of Fame (`hall-of-fame.json`)
Dean's Listers and professional board examination topnotchers.

```json
[
  {
    "id": "hof-2025-dl-1",
    "year": 2025,
    "semester": "1st",
    "name": "Juan Dela Cruz",
    "program": "BS Computer Science",
    "category": "Dean's Lister"
  },
  {
    "id": "hof-2025-top-1",
    "year": 2025,
    "name": "Elena Ramos",
    "program": "BS Mathematics",
    "category": "Topnotcher",
    "rank": 1
  }
]
```
- `year` *(integer, 2000–2100)*: Academic year or board exam year.
- `category` *(string)*: Exactly `"Dean's Lister"` or `"Topnotcher"`.
- `semester` *(string, optional)*: `"1st"` or `"2nd"` (used for Dean's Listers).
- `rank` *(integer, optional)*: Board exam topnotcher rank (1–10).

---

### Accomplishments (`accomplishments.json`)
Term projects, review sessions, and community initiatives.

```json
[
  {
    "id": "acc-2025-01",
    "eventName": "Annual Collegiate Research Colloquium",
    "date": "2025-10-15",
    "projectHead": "Carlos Mendoza",
    "sponsors": ["Science Council", "Arts & Sciences Department"],
    "summary": "Full-scale collegiate research colloquium and seminar series for 180 graduating arts and sciences scholars."
  }
]
```
- `date` *(string, required)*: ISO 8601 format: `YYYY-MM-DD` (e.g. `2025-10-15`).
- `summary` *(string, required)*: Maximum 400 characters describing the initiative.
- `sponsors` *(array of strings)*: Empty list `[]` if none.

---

### Merchandise (`merch.json`)
Official society apparel, jackets, and accessories.

```json
[
  {
    "id": "merch-hoodie",
    "name": "HonSoc Signature Embroidered Hoodie",
    "description": "Heavyweight cotton fleece with gold crest embroidery.",
    "price": 850,
    "sizes": ["XS", "S", "M", "L", "XL", "2XL"],
    "colors": [
      { "label": "Heritage Maroon", "hex": "#8B1E1E" },
      { "label": "Charcoal Black", "hex": "#1E1E1E" }
    ],
    "images": ["/images/merch/hoodie-mockup-1.webp"],
    "available": true
  }
]
```
- `price` *(number, positive)*: In Philippine Pesos (PHP).
- `colors[].hex` *(string)*: Exactly 6 hexadecimal characters preceded by `#` (e.g. `#8B1E1E`).

---

### Gallery (`gallery.json`)
Event photography and society memories.

```json
[
  {
    "id": "gal-01",
    "title": "General Assembly AY 2025-2026",
    "date": "2025-08-20",
    "category": "Assembly",
    "image": "/images/gallery/assembly-2025.webp",
    "alt": "HonSoc members and faculty attending the annual general assembly",
    "width": 800,
    "height": 600
  }
]
```
- `date` *(string)*: `YYYY-MM-DD`.
- `alt` *(string, required)*: Descriptive accessibility text for screen readers.

---

## 4. Validating Your Edits (Self-Check)

Before opening a pull request or requesting a site update, run the automated verification command in your terminal:

```bash
npm run build
```

If your edits match the schema rules, the build command will exit with code `0` and display:
```
✓ Completed in ...
```

---

## 5. Troubleshooting Common Validation Errors

| Error Message in Terminal | Cause | Solution |
| :--- | :--- | :--- |
| `SyntaxError: Unexpected token ... in JSON at position ...` | A missing quote, unescaped character, or trailing comma. | Check the file in your code editor for red squiggly syntax lines. Ensure every comma separates items and the last item has no comma. |
| `Use ISO date: YYYY-MM-DD` | Date was written in non-standard format (e.g., `10/15/2025`). | Convert date to year-month-day format: `"2025-10-15"`. |
| `Hex color must be 6 hex characters` | Missing `#` or wrong hex length in merchandise color swatch. | Ensure the hex code is exactly 7 characters including hash: `"#8B1E1E"`. |
| `Keep summary under 400 characters` | Accomplishment summary is too lengthy. | Condense the description so character count is under 400. |
| `Invalid enum value. Expected 'official' \| 'pending'` | Typo in financial report status. | Change the status field to strictly `"official"` or `"pending"`. |
