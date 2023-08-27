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

  getCotizacionesWithItems(endpoint, query, order, limit) {
    const pipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "materias",
          localField: "items.materia",
          foreignField: "_id",
          as: "materia_info",
        },
      },
      {
        $lookup: {
          from: "planes",
          localField: "items.plan",
          foreignField: "_id",
          as: "plan_info",
        },
      },
      {
        $lookup: {
          from: "actividades",
          localField: "items.actividades",
          foreignField: "_id",
          as: "actividades_info",
        },
      },
      {
        $lookup: {
          from: "clientes", // Nombre de la colección de clientes
          localField: "cliente", // Campo que relaciona la cotización con el cliente
          foreignField: "_id", // Campo en la colección de clientes
          as: "cliente_info", // Alias para la información del cliente
        },
      },
      {
        $lookup: {
          from: "estadosCotizaciones", // Nombre de la colección de clientes
          localField: "estado", // Campo que relaciona la cotización con el cliente
          foreignField: "_id", // Campo en la colección de clientes
          as: "estado_info", // Alias para la información del cliente
        },
      },
      {
        $project: {
          _id: 1,
          total: 1,
          fecha: 1,
          cliente: {
            $mergeObjects: { $arrayElemAt: ["$cliente_info", 0] },
          },
          estado: {
            $mergeObjects: { $arrayElemAt: ["$estado_info", 0] },
          },
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: {
                materia: {
                  $mergeObjects: { $arrayElemAt: ["$materia_info", 0] },
                },
                plan: { $mergeObjects: { $arrayElemAt: ["$plan_info", 0] } },
                actividades: {
                  $map: {
                    input: "$$item.actividades",
                    as: "actId",
                    in: {
                      $mergeObjects: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$actividades_info",
                              as: "act",
                              cond: { $eq: ["$$act._id", "$$actId"] },
                            },
                          },
                          0,
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
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
      return null;
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

const json = {
  cliente: {
    celular: "3343333333",
    identificacion: "98964",
    _id: "64d28c3227645306d79acb6e",
    nombre: "Julian Benavides",
    correo: "mail@mail.com",
  },
  fecha: "2023-08-25T15:07:46.816Z",
  total: 400,
  estado: {
    nombre: "Generada",
    _id: "64e600985fef1743de870cbc",
  },
  _id: "64e8c3c4ce571a977ee9a2f9",
  items: [
    {
      actividades: {
        precio: "150",
        tipo: "64da55f2c0919e09477b59a8",
        _id: "64dabe480add76a0a305a734",
        nombre: "Quiz 2",
      },
      plan: {
        precio: "400",
        _id: "64dd1f111a3f8bb16e59b644",
        actividades: ["64dabe480add76a0a305a734", "64dac5867f3ef1926f2b73a3"],
        nombre: "Plan 3 ",
      },
      materia: {
        nombre: "Calculo II",
        tipo: "64dc1e8b1b0f1b5ea3978af8",
        _id: "64dc206ede10c0d9a0f360a6",
      },
    },
  ],
};
const json2 = {
  fecha: "2023-08-25T15:07:46.816Z",
  cliente: {
    celular: "3343333333",
    identificacion: "98964",
    _id: "64d28c3227645306d79acb6e",
    nombre: "Julian Benavides",
    correo: "mail@mail.com",
  },
  estado: {
    nombre: "Generada",
    _id: "64e600985fef1743de870cbc",
  },
  total: 400,
  _id: "64e8c3c4ce571a977ee9a2f9",
  items: [
    {
      actividades: [
        {
          tipo: "64da55f2c0919e09477b59a8",
          precio: "150",
          _id: "64dabe480add76a0a305a734",
          nombre: "Quiz 2",
        },
        {
          tipo: "64da55f2c0919e09477b59a8",
          precio: "150",
          _id: "64dac5867f3ef1926f2b73a3",
          nombre: "Quiz 4",
        },
      ],
      plan: {
        precio: "400",
        _id: "64dd1f111a3f8bb16e59b644",
        actividades: ["64dabe480add76a0a305a734", "64dac5867f3ef1926f2b73a3"],
        nombre: "Plan 3 ",
      },
      materia: {
        nombre: "Calculo II",
        tipo: "64dc1e8b1b0f1b5ea3978af8",
        _id: "64dc206ede10c0d9a0f360a6",
      },
    },
  ],
};
