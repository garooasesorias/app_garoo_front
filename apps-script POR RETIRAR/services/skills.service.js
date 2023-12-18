function insertSkill(document) {
    const result = new MongoDBLib("skills").insertDocument(
      "insertOne",
      document
    );
    return result;
  }
  
  function getSkills() {
    const query = {};
    // const order = { business_name: 1, date: -1 };
    const order = {};
    const limit = 100;
  
    const result = new MongoDBLib("skills").getDocuments(
      "find",
      query,
      order,
      limit
    );
    return result;
  }
  

  function deleteSkillsById(id) {
    const filter = {
      _id: { $oid: id },
    };
  
    const result = new MongoDBLib("skills").deleteDocument(
      "deleteOne",
      filter,
    );
    return result;
  }

  function getSkillsById() {}
  
  function updateSkillsById() {}
  