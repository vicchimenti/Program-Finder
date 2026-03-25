/**
 * @file program-7357-text-json-ld.js
 * @version 2.2.1
 * @created 2025-10-07
 * @modified 2026-03-25
 * @fileoverview Generates valid EducationalOccupationalProgram JSON-LD
 *               for Seattle University academic program pages.
 *               Adds alternateName support (first item only if multi-select).
 *               Includes preview-only diagnostics and robust data sanitation.
 *
 *               v2.2.0 adds ROR, ISNI, and Wikidata identifiers to the
 *               provider entity for enhanced entity resolution in Google
 *               Knowledge Graph and AI Overviews.
 *
 * @author
 * Victor Chimenti  |  Seattle University WebOps
 *
 * @copyright
 * © 2026 Seattle University. All rights reserved.
 *
 * @requires com.terminalfour.publish.utils.BrokerUtils
 * @requires com.terminalfour.media.IMediaManager
 * @requires com.terminalfour.spring.ApplicationContextProvider
 * @requires Content Layout 7357 – "Program Overview JSON-LD"
 * @t4layout text/json-ld
 *
 * @description
 * Pulls program data fields from T4 content metadata and constructs a
 * Schema.org EducationalOccupationalProgram object for SEO and AI readiness.
 * Handles multi-select fields (alternate names, occupations, learning modes)
 * gracefully and outputs clean JSON-LD inside the page <body>.
 *
 * Provider entity includes four institutional identifiers (IPEDS, OPE, ROR,
 * ISNI) and eight sameAs links (social profiles, Wikipedia, Wikidata, ROR,
 * ISNI) for comprehensive entity resolution.
 */

/* eslint-disable no-undef, no-unused-vars */
/* global dbStatement, publishCache, section, content, language, isPreview, document, com */

// ============================================================================
// Import T4 Utilities
// ============================================================================
importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);

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
     * Retrieves a media object from the T4 MediaManager by ID.
     *
     * @param {number} mediaID - The T4 media library ID.
     * @returns {object} The media object.
     */
    function getMediaInfo(mediaID) {
        let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
        let media = mediaManager.get(mediaID, language);
        return media;
    }

    /**
     * Reads the full text content of a media item from the T4
     * MediaManager. Used to load JSON dictionary files.
     *
     * @param {number} mediaID - The T4 media library ID.
     * @returns {string} The full text content of the media item.
     */
    function readMediaText(mediaID) {
        let mediaObj = getMediaInfo(mediaID);
        let oMediaStream = mediaObj.getMedia();
        let oScanner = new java.util.Scanner(oMediaStream).useDelimiter("\\A");
        let sMedia = "";
        while (oScanner.hasNext()) {
            sMedia += oScanner.next();
        }
        return sMedia;
    }

    // ========================================================================
    // Load MediaManager Dictionaries
    // ========================================================================

    // Load occupation dictionary (media ID 10011365)
    var occupationDict = {};
    try {
        var dictJson = readMediaText(10011365);
        occupationDict = JSON.parse(dictJson);
    } catch (dictErr) {
        isPreview && document.write("<!-- Occupation dictionary load error: " + dictErr + " -->");
    }

    // Load CIP/URL dictionary (media ID 10014460)
    var cipDict = {};
    try {
        var cipJson = readMediaText(10014460);
        cipDict = JSON.parse(cipJson);
    } catch (cipErr) {
        isPreview && document.write("<!-- CIP dictionary load error: " + cipErr + " -->");
    }

    // ========================================================================
    // Step 1: Gather field data from the T4 content item
    // ========================================================================
    var list = {};
    list["programName"] = processTags('<t4 type="content" name="Program Title" output="normal" display_field="value" delimiter="|" />');
    list["programID"] = processTags('<t4 type="meta" meta="content_id" />');
    list["alternateName"] = processTags('<t4 type="content" name="Alternate Name" output="normal" display_field="value" delimiter="|" />');
    list["school"] = processTags('<t4 type="content" name="School" output="normal" display_field="name" delimiter="|" />');
    list["programDepartment"] = processTags('<t4 type="content" name="Program Department" output="normal" display_field="value" delimiter="|" />');
    list["programType"] = processTags('<t4 type="content" name="Program Type" output="normal" display_field="name" delimiter="|" />');
    list["areaOfStudy"] = processTags('<t4 type="content" name="Area of Study" output="normal" display_field="value" delimiter="|" />');
    list["programDescription"] = processTags('<t4 type="content" name="Program Description" output="normal" modifiers="striptags,htmlentities" />');
    list["learningFormat"] = processTags('<t4 type="content" name="Learning Format" output="normal" display_field="name" delimiter="|" />');
    list["programLevel"] = processTags('<t4 type="content" name="Program Level" output="normal" display_field="name" delimiter="|" />');
    list["url"] = processTags('<t4 type="navigation" name="Return Current Section Path" id="976" />');
    list["programSummary"] = processTags('<t4 type="content" name="Program Summary" output="normal" modifiers="striptags,htmlentities" />');
    list["degree"] = processTags('<t4 type="content" name="Degree" output="normal" modifiers="striptags,htmlentities" />');
    list["duration"] = processTags('<t4 type="content" name="Time to Complete" output="normal" modifiers="striptags,htmlentities" />');
    list["credits"] = processTags('<t4 type="content" name="Credits" output="normal" modifiers="striptags,htmlentities" />');
    list["programPrerequisites"] = processTags('<t4 type="content" name="Program Prerequisites" output="normal" modifiers="striptags,htmlentities" />');
    list["occupationalCategory"] = processTags('<t4 type="content" name="Occupational Category" output="normal" display_field="value" delimiter="," />');
    list["keywordTags"] = processTags('<t4 type="content" name="Hidden Seach Terms" output="normal" modifiers="striptags,htmlentities" delimiter="," />');


    // ========================================================================
    // Step 2: Construct the page URL and identifiers
    // ========================================================================
    if (!list["programName"]) {
        isPreview && document.write("<!-- JSON-LD skipped: missing programName -->");
    } else {

        // Lookup CIP and URL from dictionary
        var programInfo = cipDict[list["programName"]];
        var programUrl = (programInfo && programInfo.url) ? programInfo.url : null;
        var programCip = (programInfo && programInfo.cip) ? programInfo.cip : null;

        if (!programInfo && isPreview) {
            document.write("<!-- Program not found in CIP dictionary: " + list["programName"] + " -->");
        }

        // ====================================================================
        // Step 3: Handle Alternate Name Field (Only First Value)
        // ====================================================================
        var altNames = list["alternateName"]
            .split("|")
            .map(function (n) { return n.trim(); })
            .filter(function (n) { return n !== ""; });

        var firstAltName = altNames.length > 0 ? altNames[0] : null;

        // Build identifier array
        var identifierArray = [];
        if (programCip) {
            identifierArray.push({
                "@type": "PropertyValue",
                "propertyID": "CIP 2020",
                "value": programCip
            });
        }

        // ====================================================================
        // Step 4: Build provider entity with institutional identifiers
        // ====================================================================

        // College/School URL mapping
        var collegeUrls = {
            "Albers School of Business & Economics": "https://www.seattleu.edu/business/",
            "College of Arts & Sciences": "https://www.seattleu.edu/arts-sciences/",
            "College of Education": "https://www.seattleu.edu/education/",
            "College of Nursing & Health Sciences": "https://www.seattleu.edu/nursing-health-sciences/",
            "College of Science & Engineering": "https://www.seattleu.edu/science-engineering/",
            "Cornish College of the Arts": "https://www.cornish.edu/",
            "School of Law": "https://law.seattleu.edu/"
        };

        var collegeName = list["school"];
        var collegeUrl = collegeUrls[collegeName] || "https://www.seattleu.edu/";

        // Build provider with full institutional identity
        var provider = {
            "@type": "CollegeOrUniversity",
            "@id": "https://www.seattleu.edu/#organization",
            "name": "Seattle University",
            "url": "https://www.seattleu.edu/",
            "logo": "https://www.seattleu.edu/media/seattle-university/site-assets/branding/seattleu-logo-300x300.png",
            "foundingDate": "1891",
            "identifier": [
                {
                    "@type": "PropertyValue",
                    "propertyID": "IPEDS ID",
                    "value": "236595"
                },
                {
                    "@type": "PropertyValue",
                    "propertyID": "OPE ID",
                    "value": "00379000"
                },
                {
                    "@type": "PropertyValue",
                    "propertyID": "ROR",
                    "value": "https://ror.org/02jqc0m91"
                },
                {
                    "@type": "PropertyValue",
                    "propertyID": "ISNI",
                    "value": "0000 0000 9949 9403"
                }
            ],
            "sameAs": [
                "https://x.com/seattleu/",
                "https://www.facebook.com/seattleu/",
                "https://www.instagram.com/seattleu/",
                "https://www.linkedin.com/school/seattle-university/",
                "https://en.wikipedia.org/wiki/Seattle_University",
                "https://www.wikidata.org/wiki/Q615873",
                "https://ror.org/02jqc0m91",
                "https://isni.org/isni/0000000099499403"
            ]
        };

        // Conditional college/department nesting
        if (collegeName && list["programDepartment"]) {
            provider["department"] = {
                "@type": "EducationalOrganization",
                "name": collegeName,
                "url": collegeUrl,
                "subOrganization": {
                    "@type": "EducationalOrganization",
                    "name": list["programDepartment"]
                }
            };
        } else if (collegeName) {
            provider["department"] = {
                "@type": "EducationalOrganization",
                "name": collegeName,
                "url": collegeUrl
            };
        } else if (list["programDepartment"]) {
            provider["department"] = {
                "@type": "EducationalOrganization",
                "name": list["programDepartment"]
            };
        }

        // ====================================================================
        // Step 5: Build occupationalCategory with classification codes
        // ====================================================================

        // Process occupationalCategory: split, trim, filter empties
        var categories = list["occupationalCategory"]
            .split(",")
            .map(function (item) { return item.trim(); })
            .filter(function (item) { return item !== ""; });

        // Build occupationalCategory array with CategoryCode objects
        var occupationalCategoryArray = [];

        categories.forEach(function (title) {
            var occ = occupationDict[title];

            if (occ) {
                // SOC code
                if (occ.soc && occ.soc.code) {
                    occupationalCategoryArray.push({
                        "@type": "CategoryCode",
                        "name": occ.title,
                        "codeValue": occ.soc.code,
                        "inCodeSet": {
                            "@type": "CategoryCodeSet",
                            "name": occ.soc.source
                        }
                    });
                }

                // ISCO code
                if (occ.isco && occ.isco.code) {
                    occupationalCategoryArray.push({
                        "@type": "CategoryCode",
                        "name": occ.title,
                        "codeValue": occ.isco.code,
                        "inCodeSet": {
                            "@type": "CategoryCodeSet",
                            "name": occ.isco.source
                        }
                    });
                }

                // O*NET code
                if (occ.onet && occ.onet.code) {
                    occupationalCategoryArray.push({
                        "@type": "CategoryCode",
                        "name": occ.soc.detailed,
                        "codeValue": occ.onet.code,
                        "inCodeSet": {
                            "@type": "CategoryCodeSet",
                            "name": occ.onet.source
                        }
                    });
                }
            } else {
                isPreview && document.write("<!-- Occupation not found in dictionary: " + title + " -->");
            }
        });

        // ====================================================================
        // Step 6: Assemble EducationalOccupationalProgram JSON-LD
        // ====================================================================
        var jsonLD = {
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            "name": list["programName"],
            "alternateName": firstAltName,
            "url": programUrl,
            "description": decodeHtmlEntities(list["programSummary"] || list["programDescription"]),
            "educationalCredentialAwarded": decodeHtmlEntities(list["degree"]),
            "timeToComplete": list["duration"],
            "numberOfCredits": list["credits"],
            "educationalProgramMode": decodeHtmlEntities(list["learningFormat"]),
            "programType": list["programType"],
            "programPrerequisites": decodeHtmlEntities(list["programPrerequisites"]),
            "identifier": identifierArray,
            "occupationalCategory": occupationalCategoryArray,
            "provider": provider
        };

        // Filter out empty properties
        Object.keys(jsonLD).forEach(function (key) {
            var val = jsonLD[key];
            if (val === null || val === undefined || val === "") {
                delete jsonLD[key];
            }
            if (Array.isArray(val) && val.length === 0) {
                delete jsonLD[key];
            }
        });

        // ====================================================================
        // Step 7: Output JSON-LD to page
        // ====================================================================
        document.write(
            '<script type="application/ld+json" id="program-jsonld">' +
                JSON.stringify(jsonLD, null, 2) +
            '</script>'
        );

    }

} catch (err) {
    isPreview && document.write("<!-- JSON-LD error: " + err + " -->");
}
