class MongoDBLib {
  constructor(collection) {
    this.api = env.mongoDBAPI;
    this.apiKey = env.mongoDBAPIKey;
    this.collection = collection;
    this.dataSource = env.mongoClusterName;
    this.dataBase = env.mongoDataBase;
  }

  createOptions(payload) {
    return {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      headers: { "api-key": this.apiKey },
      muteHttpExceptions: true,
    };
  }

  executeAPI(endpoint, options) {
    try {
      const response = UrlFetchApp.fetch(this.api + endpoint, options);
      const responseData = JSON.parse(response.getContentText());
      if (response.getResponseCode() !== 200) {
        throw new Error(
          "API request failed with response code: " + response.getResponseCode()
        );
      }
      return responseData;
    } catch (error) {
      console.error("Error executing API request:", error);
      return null; // or handle the error appropriately
    }
  }

  handleError(responseData) {
    if (responseData.error) {
      throw new Error("Error from API: " + responseData.error);
    }
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

    const options = this.createOptions(payload);

    try {
      const responseData = this.executeAPI(endpoint, options);
      this.handleError(responseData);
      return responseData.documents;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // or handle the error appropriately
    }
  }

  getDocumentsWithActivities(endpoint, query, order, limit) {
    const pipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "actividades", // Name of the actividades collection
          let: { actividadIds: "$actividades" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    { $toObjectId: "$_id" }, // Convert the string _id to ObjectId
                    "$$actividadIds",
                  ],
                },
              },
            },
          ],
          as: "actividades_relacionadas",
        },
      },
      {
        $sort: order,
      },
      {
        $limit: limit,
      },
    ];

    const payload = {
      pipeline: pipeline,
      collection: this.collection,
      dataSource: this.dataSource,
      database: this.dataBase,
    };

    const options = this.createOptions(payload);

    try {
      const responseData = this.executeAPI(endpoint, options);
      this.handleError(responseData);
      return responseData.documents;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null; // or handle the error appropriately
    }
  }

  insertDocument(endpoint, document) {
    const payload = {
      document: document,
      collection: this.collection,
      dataSource: this.dataSource,
      database: this.dataBase,
    };

    const options = this.createOptions(payload);
    const response = this.executeAPI(endpoint, options);
    return response;
  }
}
