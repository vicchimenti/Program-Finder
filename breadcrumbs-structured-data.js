/**
 * @file breadcrumbs-structured-data.js
 * @version 1.0.0
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

/***
 * Safely process T4 tags (navigation, content, meta, etc.)
 */
function processT4Tag(tag) {
  try {
    return String(
      BrokerUtils.processT4Tags(
        dbStatement,
        publishCache,
        section,
        content,
        language,
        isPreview,
        tag
      )
    );
  } catch (e) {
    return null;
  }
}

/***
 * Build Breadcrumb JSON-LD from nav object output
 */
function buildBreadcrumbJsonLd(navOutput) {
  if (!navOutput) return '';

  try {
    // Convert comma-separated ListItem fragments into an array
    var items = JSON.parse('[' + navOutput + ']');

    // Add positions
    items.forEach(function (item, index) {
      item.position = index + 1;
    });

    // Build final JSON-LD object
    var jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items
    };

    return (
      '<script type="application/ld+json">\n' +
      JSON.stringify(jsonLd, null, 2) +
      '\n</script>'
    );
  } catch (e) {
    return '';
  }
}

/***
 * Pull breadcrumb nav object (Structured Data only)
 */
var breadcrumbNav = processT4Tag(
  '<t4 type="navigation" name="Breadcrumbs for Structured Data" id="1129" />'
);

/***
 * Generate Breadcrumb JSON-LD
 */
var breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbNav);

/***
 * Write output to document
 */
if (breadcrumbJsonLd) {
  document.write(breadcrumbJsonLd);
}
