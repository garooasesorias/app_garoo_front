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
  
  function getMateriaById(id) {
    const collectionName = "materias"; // Replace with your collection name
  const mongoDB = new MongoDBLib(collectionName);

  const query = {
    _id: { $oid: id },
  };

  const order = {};
  const limit = 10;

  const documents = mongoDB.getCursos("aggregate", query, order, limit);
  console.log("Documents with related Items:", documents);
  return documents;}
  
  function updateMateriaById(id, data) {

    const filter = {
      _id: { $oid: id },
    };
    const update = {
      $set: data,
    };
  
    const result = new MongoDBLib("materias").updateDocument(
      "updateOne",
      filter,
      update
    );
    return result;
  }
  