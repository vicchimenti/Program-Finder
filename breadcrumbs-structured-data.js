/**
 * @file breadcrumbs-structured-data.js
 * @version 1.0.2
 * @fileoverview Programmable layout snippet to generate Breadcrumb JSON-LD
 *               using a T4 Navigation Object and BrokerUtils.
 * @author Victor Chimenti
 * @copyright 2025 Seattle University
 *
 * @requires com.terminalfour.publish.utils.BrokerUtils
 * @requires Navigation Object (id:1129) - Breadcrumbs for Structured Data
 *
 * @notes
 * - Runs server-side at publish time (T4 programmable layout)
 * - Outputs valid JSON-LD for BreadcrumbList
 * - Uses IA as the single source of truth
 */

/***
 * Import T4 Utilities
 */
importClass(com.terminalfour.publish.utils.BrokerUtils);

/* eslint-disable no-undef, no-with, no-unused-vars */
/* global dbStatement, publishCache, section, content, language, isPreview, document, com */

function processT4Tag(tag) {
  try {
    var BrokerUtils = com.terminalfour.publish.utils.BrokerUtils;
    return BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag);
  } catch (e) {
    document.write("<!-- processT4Tag() error: " + e + " -->");
    return "";
  }
}

try {
  // Pull and sanitize the Breadcrumbs navigation object
  var rawNav = processT4Tag('<t4 type="navigation" name="Breadcrumbs for Structured Data" id="1129" />')
    .replace(/,\s*$/, "") // Remove trailing commas
    .replace(/&quot;/g, '"') // Decode HTML entities
    .replace(/“|”/g, '"') // Normalize curly quotes
    .replace(/\r?\n|\r/g, "") // Remove newlines
    .trim();

  // Debug output (truncated to avoid blowing out markup)
  document.write("<!-- Raw Breadcrumb Nav (first 300 chars): " + rawNav.substring(0, 300) + " -->");

  // Parse into an array
  var breadcrumbData;
  try {
    breadcrumbData = JSON.parse("[" + rawNav + "]");
  } catch (parseErr) {
    document.write("<!-- Breadcrumb parse error: " + parseErr.message + " -->");
    breadcrumbData = [];
  }

  // Validate and build list items
  if (breadcrumbData.length > 0) {
    var listItems = breadcrumbData.map(function (item, index) {
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name || "(no name)",
        item: item.item || item.url || ""
      };
    });

    var breadcrumbJSONLD = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: listItems
    };

    // Output the JSON-LD to page
    document.write(
      '<script type="application/ld+json" id="breadcrumb-jsonld">' +
        JSON.stringify(breadcrumbJSONLD, null, 2) +
      "</script>"
    );

  } else {
    document.write("<!-- Breadcrumb JSON-LD: no valid data found -->");
  }

} catch (err) {
  // Top-level error handler
  var message = "Breadcrumb Script Error: " + err;
  document.write("<!-- " + message + " -->");
  document.write('<script>console.error("' + message + '")</script>');
}
