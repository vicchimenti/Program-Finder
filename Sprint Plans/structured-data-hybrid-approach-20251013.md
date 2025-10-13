# Seattle University Hybrid Structured Data Strategy

**Format:** Microdata + JSON-LD
**Purpose:** Combine the stability of body-based microdata with the AI-readiness and clarity of head-based JSON-LD.
**Scope:** Academic program pages in TerminalFour and Funnelback.

---

## 1. Overview

Seattle University’s program pages already have meta tags, Open Graph, and Twitter metadata in the `<head>`.
This hybrid approach adds two new layers of structured data for **Google AI Overviews**, **Knowledge Graph**, and **entity-based search**:

1. **Microdata** (in the `<body>`) — describes content entities for Funnelback and Google crawlers.
2. **JSON-LD** (in the `<head>`) — provides a clean, machine-readable graph for search engines and AI systems.

Both formats can coexist safely as long as they describe the same program and remain consistent.

---

## 2. JSON-LD (Head Section)

Place this in the `<head>` of the program page template.
This block is self-contained and can be dynamically generated in TerminalFour using your content fields.

```html
<!-- Structured Data for Educational Program (JSON-LD) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "name": "Accounting & Analytics, MS",
  "alternateName": "Master of Science in Accounting and Analytics",
  "description": "Earn your MS in Accounting & Analytics at Seattle University in Washington State. Develop analytical skills that prepare you for leadership in finance, accounting, and data-driven business roles.",
  "educationalCredentialAwarded": "Master of Science",
  "programMode": "In-Person",
  "timeToComplete": "P2Y",
  "numberOfCredits": "45",
  "programPrerequisites": "Bachelor’s degree in accounting, business, or related field",
  "occupationalCategory": [
    "Accountant",
    "Data Analyst",
    "Financial Analyst"
  ],
  "provider": {
    "@type": "CollegeOrUniversity",
    "name": "Seattle University",
    "url": "https://www.seattleu.edu/",
    "logo": "https://www.seattleu.edu/media/.../seattleu-logo.png",
    "sameAs": [
      "https://www.linkedin.com/school/seattle-university/",
      "https://en.wikipedia.org/wiki/Seattle_University"
    ],
    "department": {
      "@type": "EducationalOrganization",
      "name": "Albers School of Business and Economics"
    }
  },
  "hasCourse": [
    {
      "@type": "Course",
      "name": "Data Analytics for Accounting",
      "courseCode": "ACCT-5400",
      "description": "Learn data analytics techniques and tools used in accounting and auditing."
    },
    {
      "@type": "Course",
      "name": "Ethics and Corporate Responsibility",
      "courseCode": "ACCT-5700",
      "description": "Study ethical frameworks and decision-making in corporate environments."
    }
  ],
  "recognizedBy": [
    {
      "@type": "EducationalOrganization",
      "name": "AACSB International",
      "alternateName": "Association to Advance Collegiate Schools of Business",
      "url": "https://www.aacsb.edu/",
      "description": "Top 5% of business schools worldwide with AACSB accreditation."
    }
  ]
}
</script>
```

✅ **Placement:** Inside the `<head>` of each program page.
✅ **Purpose:** Machine-readable entity data for Google’s Knowledge Graph and AI Overviews.
✅ **Validation:** Test in [Schema Markup Validator](https://validator.schema.org/) or Search Console → Enhancements.

---

## 3. Microdata (Body Section)

Place this block inside the `<body>` — ideally near the top of the main content container.
Use the `hidden` attribute so it doesn’t affect layout or accessibility.

```html
<!-- Structured Data for Educational Program (Microdata) -->
<div itemscope itemtype="https://schema.org/EducationalOccupationalProgram" hidden>
  <meta itemprop="name" content="Accounting & Analytics, MS">
  <meta itemprop="alternateName" content="Master of Science in Accounting and Analytics">
  <meta itemprop="description" content="Earn your MS in Accounting & Analytics at Seattle University in Washington State.">
  <meta itemprop="educationalCredentialAwarded" content="Master of Science">
  <meta itemprop="programMode" content="In-Person">
  <meta itemprop="timeToComplete" content="P2Y">
  <meta itemprop="numberOfCredits" content="45">
  <meta itemprop="programPrerequisites" content="Bachelor’s degree in accounting, business, or related field">
  <meta itemprop="occupationalCategory" content="Accountant, Data Analyst, Financial Analyst">

  <!-- Nested Provider -->
  <div itemprop="provider" itemscope itemtype="https://schema.org/CollegeOrUniversity">
    <meta itemprop="name" content="Seattle University">
    <link itemprop="url" href="https://www.seattleu.edu/">
    <link itemprop="logo" href="https://www.seattleu.edu/media/.../seattleu-logo.png">
    <link itemprop="sameAs" href="https://www.linkedin.com/school/seattle-university/">
    <link itemprop="sameAs" href="https://en.wikipedia.org/wiki/Seattle_University">

    <!-- Nested Department -->
    <div itemprop="department" itemscope itemtype="https://schema.org/EducationalOrganization">
      <meta itemprop="name" content="Albers School of Business and Economics">
    </div>
  </div>

  <!-- Accreditation (conditional) -->
  <div itemprop="recognizedBy" itemscope itemtype="https://schema.org/EducationalOrganization">
    <meta itemprop="name" content="AACSB International">
    <meta itemprop="alternateName" content="Association to Advance Collegiate Schools of Business">
    <link itemprop="url" href="https://www.aacsb.edu/">
  </div>
</div>
```

✅ **Placement:** Inside `<body>`, preferably just after the program title.
✅ **Attribute:** Use `hidden` (not `sr-only`), since this content is not for users.
✅ **Compatibility:** Works seamlessly with TerminalFour and Funnelback indexing.

---

## 4. Implementation Summary

| Layer     | Format                                | Location          | Primary Purpose                    |
| --------- | ------------------------------------- | ----------------- | ---------------------------------- |
| Microdata | `<div itemscope ...>`                 | `<body>` (hidden) | Internal and SEO consistency       |
| JSON-LD   | `<script type="application/ld+json">` | `<head>`          | AI Overviews, Knowledge Graph      |
| Meta + OG | `<meta>`, `<title>`                   | `<head>`          | Traditional SEO and social sharing |

---

## 5. Validation & Monitoring

* Use Google’s **Schema Markup Validator** to test both JSON-LD and Microdata.
* Check **Search Console → Enhancements** for new detected entities.
* Maintain one authoritative data source (e.g., T4 taxonomy fields).
* Sync all property values between the two markup layers.

---

## 6. Future Flexibility

* Automate JSON-LD generation via TerminalFour content types.
* Continue to use Microdata for Funnelback’s crawler and internal indexing.
* Add optional `FAQPage` schema for program-specific FAQs when available.

---

**Author:** Victor Chimenti
**Date:** October 2025
**Project:** Upgrade Our Site for AI Overviews
**Version:** 1.2 — Hybrid Microdata + JSON-LD Implementation
