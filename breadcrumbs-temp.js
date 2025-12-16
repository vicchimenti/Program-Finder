/**
 * @file breadcrumbs-structured-data.js
 * @version 1.1.1.8
 * @fileoverview Generates valid Breadcrumb JSON-LD using a T4 Navigation Object.
 *               Runs server-side in TerminalFour at publish time.
 *               Includes short-circuit logging for preview environments.
 * @author Victor Chimenti
 * @copyright 2025
 *
 * @requires com.terminalfour.publish.utils.BrokerUtils
 * @requires Navigation Object (id:1129) - "Breadcrumbs for Structured Data"
 *
 * @description
 * Parses HTML anchor tags from the T4 Breadcrumb navigation object into a
 * structured JSON-LD BreadcrumbList. In preview mode, diagnostic messages
 * appear as HTML comments for easier debugging.
 */

/* eslint-disable no-undef, no-unused-vars, no-with */
/* global dbStatement, publishCache, section, content, language, isPreview, document, com */

// ============================================================================
// Import T4 Utilities
// ============================================================================
importClass(com.terminalfour.publish.utils.BrokerUtils);

/**
 * Safely process a T4 tag through BrokerUtils.
 * @param {string} tag - The T4 tag to process.
 * @returns {string} - The rendered T4 output or empty string on error.
 */
function processT4Tag(tag) {
  try {
    var BrokerUtils = com.terminalfour.publish.utils.BrokerUtils;
    return BrokerUtils.processT4Tags(
      dbStatement,
      publishCache,
      section,
      content,
      language,
      isPreview,
      tag
    );
  } catch (tagErr) {
    isPreview && document.write("<!-- processT4Tag() error: " + tagErr + " -->");
    return "";
  }
}

try {
  // ==========================================================================
  // Step 1: Retrieve and sanitize raw breadcrumb navigation markup
  // ==========================================================================
  var rawNav = String(
    processT4Tag('<t4 type="navigation" name="Breadcrumbs for Structured Data" id="1129" />')
  )
    .replace(/\r?\n|\r/g, "")
    .trim();

  isPreview && document.write("<!-- Raw Breadcrumb Nav (first 300 chars): " + rawNav.substring(0, 300) + " -->");

  // ==========================================================================
  // Step 2: Extract anchors from the navigation HTML
  // ==========================================================================
  var linkRegex = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  var breadcrumbData = [];
  var match;

  var safetyCounter = 0;
  var rawHref = "";
  var fullHref = "";

  var safetyCounter = 0;
  while ((match = linkRegex.exec(rawNav)) !== null && safetyCounter < 100) {
      safetyCounter++;
      breadcrumbData.push({
        name: match[2].replace(/<[^>]*>/g, "").trim(),
        item: "https://www.seattleu.edu" + match[1].trim(),
      });
  }

  // ==========================================================================
  // Step 3: Validate and build JSON-LD structure
  // ==========================================================================
  if (breadcrumbData.length > 0) {
    var listItems = breadcrumbData.map(function (crumb, index) {
      return {
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.item,
      };
    });

    var breadcrumbJSONLD = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: listItems,
    };

    // ==========================================================================
    // Step 4: Output JSON-LD
    // ==========================================================================
    document.write(
      '<script type="application/ld+json" id="breadcrumb-jsonld">' +
      JSON.stringify(breadcrumbJSONLD, null, 2) +
      "</script>"
    );
  } else {
    isPreview && document.write("<!-- Breadcrumb JSON-LD: no valid data found -->");
  }
} catch (err) {
  // ==========================================================================
  // Global error handler
  // ==========================================================================
  if (isPreview) {
    var msg = "Breadcrumb Script Error: " + err;
    document.write("<!-- " + msg + " -->");
    document.write('<script>console.error("' + msg + '")</script>');
  }
}
