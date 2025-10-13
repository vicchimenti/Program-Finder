# SMART Goal: AI-Ready Structured Data for Programs, News & Bios  
**Owner:** Victor Chimenti – Senior Manager of Web Development  
**Department:** Marketing & Communications  
**Review Period:** July 2025 – June 2026  
**Goal Type:** Strategic / Technical SEO Initiative  

---

## 1. Description
Seattle University is experiencing its strongest ever search performance. Sixteen months after the June 2024 site launch, our organic visibility has risen consistently and placed the university in a favorable position to claim institutional authority in higher education search results.

To build upon this foundation, we will enhance our structured data footprint across three high-value content types — **Programs**, **News**, and **Faculty Bios** — ensuring that our content is eligible for inclusion in **Google Search AI Overviews**, Knowledge Graph panels, and other AI-driven search features.

While Google’s adoption timeline is unpredictable, structured data is the prerequisite for eligibility. Therefore, the goal focuses on doing the technical and content work now so that the university’s authoritative content can surface naturally over time.

---

## 2. SMART Goal Statement
By the end of **Winter Quarter 2026**, complete the design, implementation, and validation of **Schema.org-compliant structured data** across all program, news, and faculty bio pages.  
This implementation will ensure Seattle University is **AI-Overview ready**, increase **organic search impressions**, and strengthen the university’s reputation as an authoritative source of academic information.

---

## 3. Specific
- Implement **Schema.org Microdata** for the following entities:
  - `EducationalOccupationalProgram` (academic programs)  
  - `NewsArticle` (news and stories)  
  - `Person` (faculty and staff bios)
- Add nested `CollegeOrUniversity` provider blocks for institutional context.
- Introduce hidden `FAQPage` sections and `ItemList` markup to improve machine readability.
- Preserve existing meta tags, Open Graph, and Funnelback metadata to maintain current indexing stability.
- Validate with **Google Search Console**, **Schema Markup Validator**, and **Siteimprove**.

---

## 4. Measurable
- Establish a **Q1 2025 baseline** of structured data “Enhancements detected” in **Google Search Console (GSC)**.  
  - Current baseline (Oct 2025):
    - **FAQPage:** 1 valid / 2 invalid (1 critical issue)  
    - **BreadcrumbList:** 85 valid / 0 invalid (outside current scope)
- Achieve a **100% valid detection rate** in GSC for `EducationalOccupationalProgram`, `Person`, and `FAQPage` schema by **Q2 2026**.
- Monitor an **organic impression increase of 10–15%** on structured pages compared to 2025 baseline.
- Validate all schema entities via Schema Markup Validator (no errors/warnings).
- Quarterly progress tracking using exported GSC reports.

**Progress Table Template**

| Quarter | Schema Type | Valid | Invalid | Change | Notes |
|----------|--------------|--------|----------|---------|--------|
| Q1 2025 | FAQPage | 1 | 2 | — | Baseline |
| Q4 2025 | EducationalOccupationalProgram | 50 | 0 | +50 valid | Program pages complete |
| Q1 2026 | NewsArticle | 30 | 0 | +30 valid | News stories tagged |
| Q2 2026 | Person | 120 | 0 | +120 valid | Faculty bios complete |

---

## 5. Achievable
- Builds on SeattleU’s strong metadata and canonical URL framework.  
- Compatible with existing **TerminalFour (T4)** templates and **Funnelback** indexing.  
- Leverages the phased implementation roadmap from the *Seattle University Program Pages SEO & Structured Data Enhancement Plan* (Oct 2025).  
- Supported by in-house development capability and cross-team collaboration with Marketing, Admissions, and IT.  

---

## 6. Relevant
- Advances Seattle University’s mission to **increase national visibility** and **showcase academic expertise**.  
- Reinforces brand authority in AI-driven search, voice search, and knowledge-based results.  
- Directly aligns with Marcom’s performance indicators for **organic growth, SEO leadership, and accessibility compliance**.  

---

## 7. Time-Bound
| Phase | Deliverable | Target Completion |
|-------|--------------|-------------------|
| Phase 1 | Template audit & field mapping | Oct 2025 |
| Phase 2 | Program schema implementation | Nov 2025 |
| Phase 3 | News schema implementation | Jan 2026 |
| Phase 4 | Bio schema implementation | Mar 2026 |
| Phase 5 | Validation & GSC tracking | Apr 2026 |
| Phase 6 | Final report & documentation | June 2026 |

---

## 8. Success Indicators
✅ 100% of schema entities validated in GSC and Schema Markup Validator.  
✅ Visible detection of `EducationalOccupationalProgram`, `Person`, and `FAQPage` enhancements.  
✅ Measurable growth in impressions and CTR for structured pages.  
✅ Recognition in AI-powered results (AI Overviews, Knowledge Panels, or rich snippets).  
✅ Positive accessibility and SEO audit scores via Siteimprove.  

---

## 9. Metrics & Validation Appendix

### A. Google Search Console Tracking
- Navigate to **Enhancements → FAQ / Person / EducationalOccupationalProgram**.  
- Export quarterly results to Google Sheets for documentation.  
- Record **Valid**, **Warning**, and **Error** counts per schema type.  
- Use “Validate Fix” after resolving errors to trigger recrawls.

**Example Tracking Table**

| Date | Schema Type | Valid Items | Invalid Items | Critical Issues | Notes |
|------|--------------|--------------|----------------|------------------|--------|
| Oct 2025 | FAQPage | 1 | 2 | 1 | Detected, needs acceptedAnswer fix |
| Dec 2025 | FAQPage | 6 | 1 | 0 | Issue resolved |
| Mar 2026 | FAQPage | 12 | 0 | 0 | Fully valid |

---

### B. Validation Tools
| Tool | Purpose |
|------|----------|
| [Schema Markup Validator](https://validator.schema.org/) | Confirm syntax and item nesting |
| [Search Console → Enhancements](https://search.google.com/search-console) | Track valid/invalid schema |
| [Siteimprove SEO Module](https://siteimprove.com) | Accessibility and metadata checks |
| Screaming Frog / Ahrefs | Crawl validation and consistency |

---

### C. Notes
- Breadcrumbs are valid but out of scope for this goal. A separate post-2026 initiative will address sitewide breadcrumb coverage (currently 85 valid out of ~6,000 pages).  
- This SMART Goal remains focused on **AI-relevant structured data** only.

---

## 10. Long-Term Opportunities
- Automate schema generation via T4 content types.  
- Extend entity coverage to `Course` and `Event` schema for granular academic indexing.  
- Publish an internal **Schema Governance Policy** for consistent editor practices.  
- Integrate structured data checks into quarterly SEO audits.

---

**Deliverable Summary**  
- Structured data implemented for all Programs, News, and Bios.  
- Verified in Google Search Console and Schema Markup Validator.  
- Quarterly progress evidence documented for annual review.  
- Institutional readiness for AI Overviews achieved by Winter 2026.

---

