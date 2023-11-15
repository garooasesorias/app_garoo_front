function insertEstadoAsesor(document) {
    const result = new MongoDBLib("estadosAsesores").insertDocument(
      "insertOne",
      document
    );
    return result;
  }
  
  function getEstadosAsesores() {
    const query = {};
    // const order = { business_name: 1, date: -1 };
    const order = {};
    const limit = 100;
  
    const result = new MongoDBLib("estadosAsesores").getDocuments(
      "find",
      query,
      order,
      limit
    );
    return result;
  }
  
  function getEstadoAsesorById() {}
  
  function updateEstadoAsesorById() {}
  