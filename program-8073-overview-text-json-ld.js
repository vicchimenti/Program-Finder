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

    var list = {};
    list["id"] = processTags('<t4 type="meta" meta="content_id" />');
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
    list["keywordTags"] = processTags('<t4 type="content" name="Hidden Seach Terms" output="normal" modifiers="striptags,htmlentities" delimiter="," />');

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

    var provider = {
        "@type": "CollegeOrUniversity",
        "name": "Seattle University",
        "url": "https://www.seattleu.edu/",
        "logo": "https://www.seattleu.edu/media/seattle-university/site-assets/branding/seattleu-logo-300x300.png"
    };

    if (collegeName) {
        provider["school"] = {
            "@type": "EducationalOrganization",
            "name": collegeName,
            "url": collegeUrl
        };

        if (list["programDepartment"]) {
            provider["programDepartment"] = {
                "@type": "EducationalOrganization",
                "name": list["programDepartment"]
            };
        }
    }

    var jsonLD = {
        "@context": "https://schema.org",
        "@type": "EducationalOccupationalProgram",
        "name": list["programName"],
        "description": list["programSummary"] || list["programDescription"],
        "educationalCredentialAwarded": list["degree"],
        "timeToComplete": list["duration"],
        "numberOfCredits": list["credits"],
        "programMode": list["learningFormat"],
        "programType": list["programType"],
        "provider": provider
    };

    document.write(
        '<script type="application/ld+json">' +
        JSON.stringify(jsonLD) +
        "</" + "script>"
    );

} catch (err) {
    document.write(err);
}
