function insertMateria(document) {
    const result = new MongoDBLib("materias").insertDocument(
      "insertOne",
      document
    );
    return result;
  }
  
  function getMaterias() {
    const query = {};
    // const order = { business_name: 1, date: -1 };
    const order = {};
    const limit = 100;
  
    const result = new MongoDBLib("materias").getDocuments(
      "find",
      query,
      order,
      limit
    );
    return result;
  }
  
  function getMateriaById() {}
  
  function updateMateriaById() {}
  