/** 
 * program-8073-overview-text-json-ld.js
 * text/json-ld for Program Detail AI Overview
 * id: 8073
 * 
 */

importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);

try {

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

    function getMediaInfo(mediaID) {
        let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
        let media = mediaManager.get(mediaID, language);
        return media;
    }

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

    var occupationDict = {};
    try {
        var dictJson = readMediaText(10011365);
        occupationDict = JSON.parse(dictJson);
    } catch (dictErr) {
        document.write("<!-- Occupation dictionary load error: " + dictErr + " -->");
    }

    var list = {};
    list["programName"] = processTags('<t4 type="content" name="Program Title" output="normal" display_field="value" delimiter="|" />');
    list["programID"] = processTags('<t4 type="meta" meta="content_id" />');
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

    // Critical field check
    if (!list["programName"]) {
        document.write("<!-- JSON-LD skipped: missing programName -->");
    } else {

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

        // Build provider with conditional college/department nesting
        var provider = {
            "@type": "CollegeOrUniversity",
            "name": "Seattle University",
            "url": "https://www.seattleu.edu/",
            "logo": "https://www.seattleu.edu/media/seattle-university/site-assets/branding/seattleu-logo-300x300.png"
        };

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

        // Process occupationalCategory: split, trim, filter empties
        var categories = list["occupationalCategory"]
            .split(",")
            .map(function(item) { return item.trim(); })
            .filter(function(item) { return item !== ""; });

        // Build occupationalCategory array with CategoryCode objects
        var occupationalCategoryArray = [];
        
        categories.forEach(function(title) {
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
                // Fallback: occupation not in dictionary, include title only
                document.write("<!-- Occupation not found in dictionary: " + title + " -->");
            }
        });

        // Build main JSON-LD object
        var jsonLD = {
            "@context": "https://schema.org",
            "@type": "EducationalOccupationalProgram",
            "name": list["programName"],
            "description": decodeHtmlEntities(list["programSummary"] || list["programDescription"]),
            "educationalCredentialAwarded": decodeHtmlEntities(list["degree"]),
            "timeToComplete": list["duration"],
            "numberOfCredits": list["credits"],
            "programMode": list["learningFormat"],
            "programType": list["programType"],
            "programPrerequisites": decodeHtmlEntities(list["programPrerequisites"]),
            "occupationalCategory": occupationalCategoryArray,
            "provider": provider
        };

        // Filter out empty properties
        Object.keys(jsonLD).forEach(function(key) {
            var val = jsonLD[key];
            if (val === null || val === undefined || val === "") {
                delete jsonLD[key];
            }
            if (Array.isArray(val) && val.length === 0) {
                delete jsonLD[key];
            }
        });

        // Output JSON-LD
        document.write(
            '<script type="application/ld+json">' +
            JSON.stringify(jsonLD) +
            "</" + "script>"
        );
    }

} catch (err) {
    document.write("<!-- JSON-LD error: " + err + " -->");
}