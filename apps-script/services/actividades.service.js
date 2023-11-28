function insertActividad(document) {
    const result = new MongoDBLib("actividades").insertDocument(
      "insertOne",
      document
    );
    return result;
  }
  
  function getActividades() {
    const query = {};
    // const order = { business_name: 1, date: -1 };
    const order = {};
    const limit = 100;
  
    const result = new MongoDBLib("actividades").getDocuments(
      "find",
      query,
      order,
      limit
    );
    return result;
  }
  
  function deleteActividadById(id) {
    const filter = {
      _id: { $oid: id },
    };
  
    const result = new MongoDBLib("actividades").deleteDocument(
      "deleteOne",
      filter,
    );
    return result;
  }

  function getActividadById() {}
  
  function updateActividadById() {}
  