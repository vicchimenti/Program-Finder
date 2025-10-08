# Seattle University Program Pages AI Overview SEO Implementation Plan

## Executive Summary

### Project Overview
Seattle University is implementing enhanced structured data and FAQ content across 167 academic program pages to optimize for Google AI Overviews. This initiative builds on our existing strong SEO foundation to position SU as a leader in higher-ed technical SEO and improve program discoverability in Google's AI-driven search ecosystem.

### Strategic Goals
- **AI Overview Inclusion**: Make all 167 program pages eligible for Google AI Overview features
- **National Reach**: Expand recruitment beyond local market while leveraging Seattle's competitive advantages
- **Structured Data Leadership**: Establish SU as higher-ed gold standard for semantic SEO
- **Conversion Optimization**: Improve click-through rates and RFI form completions through enhanced search visibility

### Expected Outcomes
- Increased program page visibility in AI-driven search results
- Higher click-through rates from enhanced search snippets
- Improved Knowledge Graph presence and entity recognition
- Competitive advantage in higher-ed search landscape

---

## Technical Implementation Strategy

### Current Foundation (Strengths)
✅ **Existing Infrastructure**: 
- Clean canonical URLs and HTTPS throughout
- TerminalFour CMS with consistent page templates
- Basic EducationalOccupationalProgram schema implemented
- Rich Open Graph and Twitter Card metadata
- Google Analytics 4 and Slate RFI form tracking

### Implementation Approach: Taxonomy-Driven Schema

**Philosophy**: Use controlled taxonomies in T4 to ensure data quality and consistency across all 167 programs, rather than pulling from existing HTML content.

**Benefits**:
- Editorial control and data validation
- Consistent schema output across all programs
- Easy maintenance and updates
- Scalable to future program additions

---

## Phase 1: Enhanced Structured Data

### A. Expanded EducationalOccupationalProgram Schema

**Current Implementation** (already in place):
```html
<div itemscope itemtype="https://schema.org/EducationalOccupationalProgram">
  <meta itemprop="name" content="Accounting & Analytics, MS">
  <meta itemprop="alternateName" content="Master of Science in Accounting and Analytics">
  <meta itemprop="description" content="Program description...">
  <meta itemprop="educationalCredentialAwarded" content="Master of Science">
  <meta itemprop="programMode" content="In-Person">
  <meta itemprop="timeToComplete" content="P2Y">
  <meta itemprop="numberOfCredits" content="45">
</div>
```

**Enhanced Implementation** (to be added):
```html
<div itemscope itemtype="https://schema.org/EducationalOccupationalProgram">
  <!-- Existing properties maintained -->
  <meta itemprop="name" content="{program_name_taxonomy}">
  <meta itemprop="alternateName" content="{program_alt_name_taxonomy}">
  <meta itemprop="description" content="{program_description_taxonomy}">
  
  <!-- New AI-optimized properties -->
  <meta itemprop="startDate" content="{start_date_taxonomy}">
  <meta itemprop="applicationDeadline" content="{deadline_taxonomy}">
  <meta itemprop="financialAidEligible" content="true">
  <meta itemprop="maximumEnrollment" content="{enrollment_taxonomy}">
  <meta itemprop="typicalCreditsPerTerm" content="{credits_per_term_taxonomy}">
  <meta itemprop="programType" content="{program_type_taxonomy}">
  <meta itemprop="deliveryMode" content="{delivery_mode_taxonomy}">
  <meta itemprop="hasCredential" content="{credential_awarded_taxonomy}">
  <meta itemprop="occupationalCategory" content="{career_outcome_1_taxonomy}, {career_outcome_2_taxonomy}, {career_outcome_3_taxonomy}">
  <meta itemprop="programPrerequisites" content="{prerequisites_taxonomy}">
  
  <!-- Provider relationship -->
  <div itemprop="provider" itemscope itemtype="https://schema.org/CollegeOrUniversity">
    <meta itemprop="name" content="Seattle University">
    <link itemprop="url" href="https://www.seattleu.edu/">
    <link itemprop="logo" href="https://www.seattleu.edu/media/.../seattleu-logo.png">
    <link itemprop="sameAs" href="https://www.linkedin.com/school/seattle-university/">
    <link itemprop="sameAs" href="https://en.wikipedia.org/wiki/Seattle_University">
    
    <!-- Department/School relationship -->
    <div itemprop="department" itemscope itemtype="https://schema.org/EducationalOrganization">
      <meta itemprop="name" content="{school_department_taxonomy}">
    </div>
  </div>
  
  <!-- Accreditation relationships (conditional based on taxonomy selections) -->
  {if aacsb_accreditation_selected}
  <div itemprop="recognizedBy" itemscope itemtype="https://schema.org/EducationalOrganization">
    <meta itemprop="name" content="AACSB International">
    <meta itemprop="alternateName" content="Association to Advance Collegiate Schools of Business">
    <link itemprop="url" href="https://www.aacsb.edu/">
    <meta itemprop="description" content="Top 5% of business schools worldwide with AACSB accreditation">
  </div>
  {endif}
  
  {if iia_center_of_excellence_selected}
  <div itemprop="recognizedBy" itemscope itemtype="https://schema.org/EducationalOrganization">
    <meta itemprop="name" content="Institute of Internal Auditors">
    <meta itemprop="description" content="Center of Excellence Status">
  </div>
  {endif}
</div>
```

### B. FAQ Schema for AI Overviews

**Implementation Strategy**: Hidden FAQ schema separate from visible accordion content to ensure clean, plaintext answers optimized for AI Overview inclusion.

```html
<!-- Hidden FAQ schema - optimized for AI Overviews -->
<div itemscope itemtype="https://schema.org/FAQPage" style="display:none;">
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <meta itemprop="name" content="{faq_question_1}">
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <meta itemprop="text" content="{faq_answer_1}">
    </div>
  </div>
  
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <meta itemprop="name" content="{faq_question_2}">
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <meta itemprop="text" content="{faq_answer_2}">
    </div>
  </div>
</div>
```

---

## Required Taxonomy Structure

### Core Program Taxonomies

**1. Program Duration**
```
- 1 year (P1Y)
- 1.5 years (P1Y6M)
- 2 years (P2Y)
- 3 years (P3Y)
- 4 years (P4Y)
- Variable/Part-time options
```

**2. Delivery Mode**
```
- In-Person
- Online
- Hybrid
- Evening/Weekend
- Accelerated
```

**3. Career Outcomes** (multi-select, 3-5 per program)
```
- Accountant
- Data Analyst
- Financial Analyst
- Business Intelligence Analyst
- Internal Auditor
- CPA
- Financial Manager
- Business Consultant
- Software Developer
- Nurse Practitioner
- [Comprehensive list across all disciplines]
```

**4. Accreditations/Recognitions** (multi-select)
```
- AACSB Accredited
- ABET Accredited
- Center of Excellence (Institute of Internal Auditors)
- CCNE Accredited
- [Additional accreditations by college]
```

**5. Prerequisites**
```
- Bachelor's degree required
- Bachelor's in [specific field] required
- Work experience required
- Portfolio required
- Interview required
- GRE/GMAT required
- [Additional requirements]
```

**6. Program Types**
```
- Undergraduate
- Graduate
- Certificate
- Doctoral
- Professional
```

**7. Schools/Departments**
```
- Albers School of Business and Economics
- College of Engineering
- College of Nursing
- College of Arts and Sciences
- [All schools/departments]
```

### FAQ Content Strategy

**Question Type 1: Duration/Format** (High AI Overview inclusion rate)
- Template: "How long does the [Program Name] at Seattle University take to complete?"
- Answer includes: Duration, credit hours, part-time options, Seattle location advantage

**Question Type 2: Career Outcomes/Differentiation** (High search intent)
- Template: "What jobs can I get with a [Degree] in [Field] from Seattle University?"
- Answer includes: 3-5 career outcomes, Seattle tech/business ecosystem, unique differentiators

### FAQ Content Approach Options

**Option A: Taxonomy-Driven FAQ**
- Pre-built question templates mapped to program types
- Answer components pulled from career outcome and duration taxonomies
- Ensures consistency but less flexibility

**Option B: Custom Text Fields**
- Two plaintext fields per program: FAQ Question 1/Answer 1, FAQ Question 2/Answer 2
- Full editorial control over content
- Requires content creation for all 167 programs

**Recommended Approach**: Start with Option B using Claude-generated content for all 167 programs, then evaluate taxonomy approach based on content team feedback.

---

## Implementation Timeline

### Phase 1: Foundation (Week 1-2)
- Create taxonomy structure in T4
- Implement enhanced schema template
- Test on pilot program (Accounting & Analytics MS)

### Phase 2: FAQ Development (Week 2-3)
- Generate FAQ content for all 167 programs
- Content team review and approval
- Implement FAQ schema structure

### Phase 3: Template Integration (Week 3-4)
- Map all taxonomies to schema output
- Create conditional logic for accreditations
- Test across different program types

### Phase 4: Deployment (Week 4-5)
- Deploy to staging environment
- QA testing across program types
- Full production deployment

### Phase 5: Validation & Monitoring (Week 5-6)
- Schema Markup Validator testing
- Google Search Console monitoring
- GA4 tracking setup for AI Overview attribution

---

## Technical Requirements

### T4 Content Type Enhancements

**New Fields Required**:
- Program Duration (taxonomy)
- Delivery Mode (taxonomy)
- Career Outcomes (multi-select taxonomy)
- Accreditations (multi-select taxonomy)
- Prerequisites (taxonomy)
- FAQ Question 1 (text field)
- FAQ Answer 1 (text field)
- FAQ Question 2 (text field)
- FAQ Answer 2 (text field)
- Start Date (date field)
- Application Deadline (date field)
- Maximum Enrollment (number field)
- Credits Per Term (text field)

### Template Logic

**Conditional Schema Rendering**:
```html
{if program_type == "Graduate"}
  <meta itemprop="programType" content="Graduate">
{elseif program_type == "Undergraduate"}
  <meta itemprop="programType" content="Undergraduate">
{endif}

{foreach accreditation in selected_accreditations}
  {if accreditation == "AACSB"}
    <!-- AACSB schema block -->
  {elseif accreditation == "ABET"}
    <!-- ABET schema block -->
  {endif}
{endforeach}
```

---

## Success Metrics & Monitoring

### Primary KPIs
- **AI Overview Appearances**: Track via Google Search Console and manual monitoring
- **Click-Through Rate**: Measure improvement in search result CTR
- **RFI Form Completions**: Monitor conversion rate changes from organic search
- **Search Impressions**: Track overall search visibility improvements

### Technical Validation
- **Schema Markup Validator**: Ensure all structured data validates correctly
- **Rich Results Test**: Monitor for enhanced search result features
- **Core Web Vitals**: Ensure schema additions don't impact page performance

### Content Quality Assurance
- **Answer Length Optimization**: FAQ answers between 40-300 characters for optimal AI Overview inclusion
- **Seattle Integration**: Ensure all content naturally incorporates Seattle's advantages
- **Career Outcome Accuracy**: Validate job titles against industry standards and search volume

---

## Next Steps

### Immediate Actions Required
1. **Program Data Collection**: Compile spreadsheet with all 167 programs including basic information (name, degree type, duration, school, delivery format)
2. **FAQ Content Generation**: Claude to create 2 Q&As per program (334 total) optimized for AI Overview inclusion
3. **T4 Content Type Planning**: Design taxonomy structure and field specifications
4. **Pilot Program Selection**: Finalize test program for initial implementation

### Content Strategy Decisions Needed
- FAQ approach: Taxonomy-driven vs. custom text fields
- Accreditation prioritization by college/program type
- Geographic targeting balance for national vs. local appeal

### Technical Preparation
- T4 staging environment setup
- Schema validation tools configuration
- Google Search Console enhanced monitoring setup

---

## Project Contacts & Resources

**Key Stakeholders**: Marketing leadership, content strategy team, web development team
**Primary Tools**: TerminalFour CMS, Google Analytics 4, Google Search Console, Slate CRM
**External Resources**: Schema.org documentation, Google Search Central guidelines

**Project Success Criteria**: All 167 program pages optimized for AI Overview inclusion with validated structured data and strategic FAQ content leveraging Seattle's competitive advantages for national recruitment growth.