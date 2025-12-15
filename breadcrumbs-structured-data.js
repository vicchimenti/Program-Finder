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
    var BreadcrumbImports = JavaImporter(
      com.terminalfour.publish.utils.BrokerUtils
    );
    with (BreadcrumbImports) {

      // Load and sanitize T4 nav object
      var rawNav = processT4Tags('<t4 type="navigation" name="Breadcrumbs" id="1129" />')
        .replace(/,\s*$/, "") // remove trailing comma
        .replace(/&quot;/g, '"') // fix encoded quotes
        .replace(/“|”/g, '"') // normalize curly quotes
        .trim();

      // Debug output
      document.write('<!-- Raw Breadcrumb Nav: ' + rawNav.substring(0, 300) + ' -->');

      // Convert safely to array (no eval)
      var breadcrumbData;
      try {
        breadcrumbData = JSON.parse('[' + rawNav + ']');
      } catch (parseErr) {
        document.write('<!-- Breadcrumb parse error: ' + parseErr.message + ' -->');
        breadcrumbData = [];
      }

      // Build schema
      if (breadcrumbData.length > 0) {
        var listItems = breadcrumbData.map(function (item, index) {
          return {
            "@type": "ListItem",
            position: index + 1,
            name: item.name || '(no name)',
            item: item.item || ''
          };
        });

        var breadcrumbJSONLD = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": listItems
        };

        document.write(
          '<script type="application/ld+json" id="breadcrumb-jsonld">' +
          JSON.stringify(breadcrumbJSONLD, null, 2) +
          '</script>'
        );
      } else {
        document.write('<!-- Breadcrumb JSON-LD: no valid data -->');
      }
    }
  } catch (err) {
    var message = 'Breadcrumb Script Error: ' + err;
    document.write('<script>console.error("' + message + '")</script>');
  }
}