function insertAsesor(document) {
    const result = new MongoDBLib("asesores").insertDocument(
      "insertOne",
      document
    );
    return result;
  }
  
  function getAsesores() {
    const query = {};
    // const order = { business_name: 1, date: -1 };
    const order = {};
    const limit = 100;
  
    const result = new MongoDBLib("asesores").getDocuments(
      "find",
      query,
      order,
      limit
    );
    return result;
  }
  
  function getAsesorById() {}
  
  function updateAsesorById() {}
  