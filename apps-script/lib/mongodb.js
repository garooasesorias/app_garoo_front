class MongoDBLib {
  constructor(collection) {
    this.api = env.mongoDBAPI;
    this.apiKey = env.mongoDBAPIKey;
    this.collection = collection;
    this.dataSource = env.mongoClusterName;
    this.dataBase = env.mongoDataBase;
  }
  getDocuments(endpoint, query, order, limit) {
    const payload = {
      filter: query,
      sort: order,
      limit,
      collection: this.collection,
      dataSource: this.dataSource,
      database: this.dataBase,
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      headers: { "api-key": this.apiKey },
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(this.api + endpoint, options);
    const documents = JSON.parse(response.getContentText()).documents;
    return documents;
  }

  insertDocument(endpoint, document) {
    const payload = {
      document: document,
      collection: this.collection,
      dataSource: this.dataSource,
      database: this.dataBase,
    };

    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      headers: { "api-key": this.apiKey },
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(this.api + endpoint, options);
    return response.getContentText();
  }
}
