# Seattle University Program Pages SEO & Structured Data Enhancement Plan

## 1. Background
Seattle University already maintains a strong, consistent foundation for program pages: clean canonical URLs, rich metadata (Open Graph, Twitter, and custom Funnelback meta tags), and consistent structure across ~150 programs. These efforts ensure dependable indexing, uniform presentation, and predictable content governance within TerminalFour (T4) and Funnelback.

However, Google’s modern search ecosystem (AI Overviews, Knowledge Graph, featured snippets, and entity-based search) increasingly favors **machine-readable structured data** and **semantic consistency** over keyword density. Our next phase should therefore focus on making our pages more *machine-interpretable* while preserving our internal search and CMS stability.

---

## 2. Objectives
- Strengthen our **structured data footprint** for Google’s AI-driven search.
- Build a **higher-ed gold standard** for SEO consistency across program pages.
- Ensure compatibility with **Funnelback**, **TerminalFour**, and **Google Search Console** without breaking current templates.
- Create future flexibility for AI Overviews, Knowledge Panels, and voice search.

---

## 3. Current Strengths
✅ Canonical URLs and HTTPS throughout.  
✅ Clean Open Graph and Twitter Card metadata.  
✅ Consistent use of program-level descriptive meta tags.  
✅ Sitemap with `lastmod` timestamps.  
✅ Logical page hierarchy under `/academics/all-programs/`.  
✅ Page performance and mobile optimization are strong.

---

## 4. Key Improvements

### A. Adopt Microdata (Schema.org) Without Removing Existing Meta Tags
We will preserve the current meta-tag model for Funnelback but add Microdata attributes that Google recognizes:

```html
<div itemscope itemtype="https://schema.org/EducationalOccupationalProgram">
  <meta itemprop="name" content="Accounting & Analytics, MS">
  <meta itemprop="alternateName" content="Master of Science in Accounting and Analytics (MSAA)">
  <meta itemprop="description" content="Discover in-depth insights into the world of accounting and analytics...">
  <link itemprop="url" href="https://www.seattleu.edu/academics/all-programs/accounting-analytics-ms/">
  <link itemprop="image" href="https://www.seattleu.edu/media/.../Seattle-University-Fountain-mw.jpg">
  <meta itemprop="educationalCredentialAwarded" content="Master of Science">
  <meta itemprop="programMode" content="In-Person">
  <meta itemprop="timeToComplete" content="P2Y">
  <meta itemprop="numberOfCredits" content="45">
  <meta itemprop="programPrerequisites" content="Bachelor’s degree in accounting, business, or related field">
  <meta itemprop="occupationalCategory" content="Accountant, Data Analyst, Financial Analyst">
</div>
```

This microdata layer can coexist peacefully with our current meta schema used by Funnelback.

### B. Add a Nested Provider Entity
```html
<div itemprop="provider" itemscope itemtype="https://schema.org/CollegeOrUniversity" hidden>
  <meta itemprop="name" content="Seattle University">
  <link itemprop="url" href="https://www.seattleu.edu/">
  <link itemprop="logo" href="https://www.seattleu.edu/media/.../seattleu-logo.png">
  <link itemprop="sameAs" href="https://www.linkedin.com/school/seattle-university/">
  <link itemprop="sameAs" href="https://en.wikipedia.org/wiki/Seattle_University">
</div>
```
This gives Google’s AI models clear context about institutional authority and brand.

### C. Expand OG/Twitter Coverage
Add missing tags for better link previews and snippet rendering:
```html
<meta property="og:locale" content="en_US">
<meta property="og:updated_time" content="2025-09-26T13:47:13-07:00">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:image:alt" content="Seattle University campus fountain looking north">
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
<meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
```

### D. Introduce FAQPage and ItemList Schema Where Appropriate
**FAQ block for program pages:**
```html
<section itemscope itemtype="https://schema.org/FAQPage" hidden>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <meta itemprop="name" content="Can I complete the MS in Accounting and Analytics while working full time?">
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <meta itemprop="text" content="Yes—flexible scheduling options support working professionals.">
    </div>
  </div>
</section>
```

**ItemList block for the all-programs page:**
```html
<div itemscope itemtype="https://schema.org/ItemList">
  <meta itemprop="name" content="All Academic Programs at Seattle University">
  <meta itemprop="numberOfItems" content="150">
  <link itemprop="itemListElement" href="https://www.seattleu.edu/academics/all-programs/accounting-analytics-ms/">
</div>
```

### E. Enhance Meta Titles and Descriptions for Intent & Region
Update templates to include intent and regional keywords:
```html
<title>Accounting & Analytics (MS) | Albers School, Seattle University (WA)</title>
<meta name="description" content="Earn your MS in Accounting & Analytics at Seattle University in Washington State. Build data and AI skills for accounting and analytics leadership roles.">
```

### F. Technical SEO
- Maintain canonical URLs in lowercase.
- Continue updating sitemap `<lastmod>` dates automatically.
- Use compressed OG images and descriptive `alt` text.
- Add `article:published_time` and `article:modified_time` for freshness cues.

---

## 5. Validation & Monitoring
- Use **Schema Markup Validator** (not Rich Results Test) to confirm Microdata entities.
- Monitor Search Console → Enhancements for new schema detections or warnings.
- Use site audits (Screaming Frog, Ahrefs, or Siteimprove) to ensure each program URL has canonical consistency, meta title, and meta description.
- Track search impressions and clicks per program via Google Search Console.

---

## 6. Phased Implementation Plan

| Phase | Focus | Key Deliverables | Timeline |
|-------|--------|------------------|-----------|
| **1** | Template audit & documentation | Identify fields → `itemprop` mapping | Week 1 |
| **2** | Add Microdata layer | Implement `itemscope` + `itemprop` blocks in base layout | Week 2–3 |
| **3** | Provider + OG enhancements | Nested org block, alt text, snippet rules | Week 4 |
| **4** | Add FAQ schema | Two-question FAQ per program | Week 5 |
| **5** | SEO tuning | Revise titles/meta with regional + intent language | Week 6 |
| **6** | QA & validation | Run Schema Markup Validator + sitewide crawl | Week 7 |
| **7** | Continuous monitoring | Quarterly updates via Search Console and Siteimprove | Ongoing |

---

## 7. Long-Term Opportunities
- Automate structured data generation via T4 content types.
- Add `Course` sub-entities under each program for AI-level granularity.
- Publish an “AI & Data Analytics” landing cluster to improve topical authority.
- Create a public **Schema Policy Guide** for editors to maintain consistency.

---

## 8. Expected Outcomes
By layering semantic Microdata onto existing meta and OG infrastructure, Seattle University’s academic program pages will:
- Become more discoverable in Google’s AI Overviews.
- Strengthen Knowledge Graph presence and entity recognition.
- Improve CTR from more descriptive, intent-rich meta content.
- Maintain compatibility with Funnelback and internal search workflows.

This roadmap positions SU as a leader in higher-ed technical SEO and structured data transparency—setting a new standard for AI-ready academic content.

