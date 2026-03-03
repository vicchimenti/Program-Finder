/**
 * @file v10-text-json-ld.js
 * @version 0.0.0
 * @fileoverview Generates valid FAQPage JSON-LD for Seattle University
 *               academic program FAQ components. Outputs a separate
 *               structured data block in the page body alongside the
 *               visible FAQ accordion content.
 *
 *               Pulls question selections from taxonomy lists and
 *               freeform answer text from WYSIWYG fields across five
 *               taxonomy categories. Validates each Q&A pair, sanitizes
 *               answer content, and outputs clean JSON-LD only when at
 *               least one complete pair exists.
 *
 * @author
 * Victor Chimenti  |  Seattle University MarCom Web Team
 *
 * @copyright
 * © 2025 Seattle University. All rights reserved.
 *
 * @requires com.terminalfour.publish.utils.BrokerUtils
 * @requires Content Layout v10 – "Program FAQ JSON-LD"
 *
 * @description
 * Five taxonomy categories are supported, each with a question (list
 * selection) and answer (WYSIWYG plaintext) pair:
 *
 *   1. Program Basics
 *   2. Program Format & Delivery
 *   3. Program Admissions & Prerequisites
 *   4. Program Outcomes & Careers
 *   5. Program Distinctives
 *
 * Editors select up to one question per taxonomy and write a plaintext
 * answer. The recommended maximum is three Q&A pairs per program.
 * All five slots are optional.
 *
 * Questions are safe by design (taxonomy list values). Answers require
 * strict validation: HTML entity decoding, line break removal, whitespace
 * normalization, and empty-string rejection.
 *
 * Output is a standalone FAQPage JSON-LD script block with no
 * organization or provider information (handled by the separate
 * EducationalOccupationalProgram schema in the page head).
 */

/* eslint-disable no-undef, no-unused-vars */
/* global dbStatement, publishCache, section, content, language, isPreview, document, com */

try {

    // ========================================================================
    // T4 Utilities
    // ========================================================================

    /**
     * Processes a T4 tag string and returns the resolved value.
     *
     * @param {string} t4Tag - The T4 tag markup to evaluate.
     * @returns {string} The resolved tag value from the content item.
     */
    function processTags(t4Tag) {
        myContent = content || null;
        return String(
            com.terminalfour.publish.utils.BrokerUtils.processT4Tags(
                dbStatement,
                publishCache,
                section,
                myContent,
                language,
                isPreview,
                t4Tag
            )
        );
    }

    /**
     * Decodes common HTML entities returned by T4 tag processing.
     * Handles smart quotes, dashes, ampersands, non-breaking spaces,
     * and ellipses.
     *
     * @param {string} str - The string containing HTML entities.
     * @returns {string} The decoded string, or the original if falsy.
     */
    function decodeHtmlEntities(str) {
        if (!str) return str;
        return str
            .replace(/&rsquo;/g, "'")
            .replace(/&lsquo;/g, "'")
            .replace(/&rdquo;/g, '"')
            .replace(/&ldquo;/g, '"')
            .replace(/&mdash;/g, "—")
            .replace(/&ndash;/g, "–")
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ")
            .replace(/&hellip;/g, "…");
    }

    /**
     * Sanitizes a freeform answer string for JSON-LD output.
     * Decodes HTML entities, strips line breaks and tabs, collapses
     * multiple spaces, and trims leading/trailing whitespace.
     *
     * @param {string} str - The raw answer text from T4.
     * @returns {string} The sanitized string ready for JSON-LD, or
     *                    empty string if input is null/undefined/empty.
     */
    function sanitizeAnswer(str) {
        if (!str) return "";
        var clean = decodeHtmlEntities(str);
        clean = clean
            .replace(/\r\n/g, " ")
            .replace(/\r/g, " ")
            .replace(/\n/g, " ")
            .replace(/\t/g, " ")
            .replace(/\s{2,}/g, " ")
            .trim();
        return clean;
    }

    // ========================================================================
    // Step 1: Gather Q&A pairs from T4 content elements
    // ========================================================================

    var faqPairs = [
        {
            question: processTags('<t4 type="content" name="Program Basics Question" output="normal" display_field="value" />'),
            answer:   processTags('<t4 type="content" name="Program Basics Answer" output="normal" modifiers="striptags,htmlentities" />')
        },
        {
            question: processTags('<t4 type="content" name="Program Format Delivery Question" output="normal" display_field="value" />'),
            answer:   processTags('<t4 type="content" name="Program Format Delivery Answer" output="normal" modifiers="striptags,htmlentities" />')
        },
        {
            question: processTags('<t4 type="content" name="Program Admissions & Prerequisites Question" output="normal" display_field="value" />'),
            answer:   processTags('<t4 type="content" name="Program Admissions & Prerequisites Answer" output="normal" modifiers="striptags,htmlentities" />')
        },
        {
            question: processTags('<t4 type="content" name="Program Outcomes & Careers Question" output="normal" display_field="value" />'),
            answer:   processTags('<t4 type="content" name="Program Outcomes & Careers Answer" output="normal" modifiers="striptags,htmlentities" />')
        },
        {
            question: processTags('<t4 type="content" name="Program Distinctives Question" output="normal" display_field="value" />'),
            answer:   processTags('<t4 type="content" name="Program Distinctives Answer" output="normal" modifiers="striptags,htmlentities" />')
        }
    ];

    // ========================================================================
    // Step 2: Validate pairs and build mainEntity array
    // ========================================================================

    var mainEntity = [];

    faqPairs.forEach(function (pair) {
        var q = pair.question ? pair.question.trim() : "";
        var a = sanitizeAnswer(pair.answer);

        if (q !== "" && a !== "") {
            mainEntity.push({
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": a
                }
            });
        } else if (isPreview) {
            if (q !== "" && a === "") {
                document.write("<!-- FAQ pair skipped: question present but answer is empty or invalid -->");
            }
            if (q === "" && a !== "") {
                document.write("<!-- FAQ pair skipped: answer present but question is missing -->");
            }
        }
    });

    // ========================================================================
    // Step 3: Output FAQPage JSON-LD if valid pairs exist
    // ========================================================================

    if (mainEntity.length > 0) {
        var jsonLD = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": mainEntity
        };

        document.write(
            '<script type="application/ld+json">' +
                JSON.stringify(jsonLD, null, 2) +
            '</script>'
        );
    } else {
        isPreview && document.write("<!-- FAQ JSON-LD skipped: no valid Q&A pairs found -->");
    }

} catch (err) {
    isPreview && document.write("<!-- FAQ JSON-LD error: " + err + " -->");
}
