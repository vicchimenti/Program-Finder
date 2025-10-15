try {
  //Defining main functions
  function processTags(t4Tag) {
    myContent = content || null;
    return String(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, myContent, language, isPreview, t4Tag));
  }

  var list = {};
  list['id'] = processTags('<t4 type="meta" meta="content_id" />');
  list['programName'] = processTags('<t4 type="content" name="Program Title" output="normal" display_field="value" delimiter="|" />');
  list['programID'] = processTags('<t4 type="meta" meta="content_id" />');
  list['school'] = processTags('<t4 type="content" name="School" output="normal" display_field="name" delimiter="|" />');
  list['programDepartment'] = processTags('<t4 type="content" name="Program Department" output="normal" display_field="name" delimiter="|" />');
  list['programType'] = processTags('<t4 type="content" name="Program Type" output="normal" display_field="name" delimiter="|" />');
  list['areaOfStudy'] = processTags('<t4 type="content" name="Area of Study" output="normal" display_field="value" delimiter="|" />');
  list['programDescription'] = processTags('<t4 type="content" name="Program Description" output="normal" modifiers="striptags,htmlentities" />');
  list['learningFormat'] = processTags('<t4 type="content" name="Learning Format" output="normal" display_field="name" delimiter="|" />');
  list['programLevel'] = processTags('<t4 type="content" name="Program Level" output="normal" display_field="name" delimiter="|" />');
  list['url'] = processTags('<t4 type="navigation" name="Return Current Section Path" id="976" />');
  list['programSummary'] = processTags('<t4 type="content" name="Program Summary" output="normal" modifiers="striptags,htmlentities" />');
  list['degree'] = processTags('<t4 type="content" name="Degree" output="normal" modifiers="striptags,htmlentities" />');
  list['duration'] = processTags('<t4 type="content" name="Duration" output="normal" modifiers="striptags,htmlentities" />');
  list['credits'] = processTags('<t4 type="content" name="Credits" output="normal" modifiers="striptags,htmlentities" />');
  list['keywordTags'] = processTags('<t4 type="content" name="Hidden Seach Terms" output="normal" modifiers="striptags,htmlentities" delimiter="," />');

  var jsonObj = new org.json.JSONObject(list);
  document.write(jsonObj.toString() + ',');
} catch (err) {
  document.write(err);
}