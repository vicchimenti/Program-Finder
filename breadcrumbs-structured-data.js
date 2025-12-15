/**
 * @file breadcrumbs-structured-data.js
 * @version 1.0.5
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
  var rawNav = String(processT4Tag('<t4 type="navigation" name="Breadcrumbs for Structured Data" id="1129" />'))
    .replace(/\r?\n|\r/g, "")
    .trim();

  // Debug output
  document.write("<!-- Raw Breadcrumb Nav (first 300 chars): " + rawNav.substring(0, 300) + " -->");

  // Extract <a> tags and build breadcrumb data
  var linkRegex = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  var breadcrumbData = [];
  var match;
  while ((match = linkRegex.exec(rawNav)) !== null) {
    breadcrumbData.push({
      name: match[2].replace(/<[^>]*>/g, "").trim(),
      item: match[1].trim()
    });
  }

  // Validate and build JSON-LD
  if (breadcrumbData.length > 0) {
    var listItems = breadcrumbData.map(function (item, index) {
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item
      };
    });

    var breadcrumbJSONLD = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: listItems
    };

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
