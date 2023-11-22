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
      console.log("response...");
      console.log(response.getContentText());
      const responseData = JSON.parse(response.getContentText());
      const responseCode = response.getResponseCode();

      // Aceptar tanto el código 200 (OK) como el 201 (Created)
      if (responseCode !== 200 && responseCode !== 201) {
        throw new Error(
          "API request failed with response code: " + responseCode
        );
      }
      return responseData;
    } catch (error) {
      console.error("Error executing API request:", error);
      return null; // o maneja el error de manera apropiada
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

  deleteDocument(endpoint, filter) {
    const payload = {
      dataSource: this.dataSource,
      database: this.dataBase,
      collection: this.collection,
      filter: filter, // El criterio para seleccionar qué documentos eliminar
    };

    const options = this.createOptions(payload); // Usamos POST como en el ejemplo de curl

    try {
      const responseData = this.executeAPI(endpoint, options);
      this.handleError(responseData);
      return responseData; // Retornamos la respuesta directamente
    } catch (error) {
      console.error("Error deleting document:", error);
      return null; // o manejar el error adecuadamente
    }
  }

  updateDocument(endpoint, filter, update) {
    const payload = {
      dataSource: this.dataSource,
      database: this.dataBase,
      collection: this.collection,
      filter: filter, // El criterio para seleccionar qué documentos actualizar
      update: update, // Las operaciones de actualización a aplicar
      upsert: true,
    };

    const options = this.createOptions(payload); // Usamos POST como en el ejemplo de curl

    try {
      const responseData = this.executeAPI(endpoint, options);
      this.handleError(responseData);
      return responseData; // Retornamos la respuesta directamente
    } catch (error) {
      console.error("Error updating document:", error);
      return null; // o manejar el error adecuadamente
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

  getDocumentsWithExpiredActivities(endpoint, currentDate) {
    const pipeline = [
      {
        $project: {
          _id: 1,
          actividades: {
            $filter: {
              input: "$actividades",
              as: "actividad",
              cond: {
                $or: [
                  { $eq: ["$$actividad.estadoAsesor", null] },
                  { $eq: ["$$actividad.estadoAdm", null] },
                  { $eq: ["$$actividad.fechaVencimiento", null] },
                  { $lt: ["$$actividad.fechaVencimiento", currentDate] }, // Compara la fecha de vencimiento con la fecha actual
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          "actividades.0": { $exists: true },
        },
      },
      {
        $project: {
          _id: 1,
          actividades: {
            $map: {
              input: "$actividades",
              as: "actividad",
              in: {
                _id: "$$actividad._id",
                nota: { $ifNull: ["$$actividad.nota", 0] },
                estadoAdm: "$$actividad.estadoAdm",
                estadoAsesor: "$$actividad.estadoAsesor",
                fechaVencimiento: {
                  $cond: {
                    if: { $eq: ["$$actividad.fechaVencimiento", ""] },
                    then: null,
                    else: {
                      $cond: {
                        if: {
                          $lt: ["$$actividad.fechaVencimiento", currentDate],
                        },
                        then: "expired",
                        else: "$$actividad.fechaVencimiento",
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
      return null; // or handle the error appropriately
    }
  }
  getSkillsWithEspecialidades(endpoint, query, order, limit) {
    const pipeline = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: "skills", // Name of the actividades collection
          let: { skillIds: "$skills" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    { $toObjectId: "$_id" }, // Convert the string _id to ObjectId
                    "$$skillIds",
                  ],
                },
              },
            },
          ],
          as: "skills_relacionadas",
        },
      },
      {
        $lookup: {
          from: "especialidades", // Name of the actividades collection
          let: { especialidadIds: "$especialidades" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    { $toObjectId: "$_id" }, // Convert the string _id to ObjectId
                    "$$especialidadIds",
                  ],
                },
              },
            },
          ],
          as: "especialidades_relacionadas",
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
          from: "descuentos",
          localField: "items.descuento",
          foreignField: "_id",
          as: "descuento_info",
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
          divisionPagos: 1, // Incluyendo divisionPagos aquí
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
                descuento: {
                  $mergeObjects: { $arrayElemAt: ["$descuento_info", 0] },
                },
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

  getCursos(endpoint, query, order, limit) {
    const pipeline = [
      {
        $match: query, // Agrega tu filtro aquí si es necesario
      },
      {
        $lookup: {
          from: "materias",
          localField: "materia",
          foreignField: "_id",
          as: "materia_info",
        },
      },
      {
        $lookup: {
          from: "asignamientos",
          localField: "_id",
          foreignField: "curso",
          as: "asignamiento_info",
        },
      },
      {
        $lookup: {
          from: "clientes",
          localField: "cliente",
          foreignField: "_id",
          as: "cliente_info",
        },
      },
      {
        $lookup: {
          from: "estadosCursos",
          localField: "estado",
          foreignField: "_id",
          as: "estado_info",
        },
      },
      {
        $unwind: "$actividades", // Descomponer actividades de curso.actividades
      },
      {
        $lookup: {
          from: "asesores", // Asumo que la colección se llama "asesores"
          localField: "actividades.asesor",
          foreignField: "_id",
          as: "asesor_info",
        },
      },
      {
        $lookup: {
          from: "actividades",
          localField: "actividades",
          foreignField: "_id",
          as: "actividad_info",
        },
      },
      {
        $group: {
          _id: "$_id",
          fecha: { $first: "$fecha" },
          materia: {
            $first: { $mergeObjects: { $arrayElemAt: ["$materia_info", 0] } },
          },
          cliente: {
            $first: { $mergeObjects: { $arrayElemAt: ["$cliente_info", 0] } },
          },
          estado: {
            $first: { $mergeObjects: { $arrayElemAt: ["$estado_info", 0] } },
          },
          asignamiento: {
            $first: {
              $mergeObjects: { $arrayElemAt: ["$asignamiento_info", 0] },
            },
          },
          actividades: {
            $push: {
              $mergeObjects: [
                { $arrayElemAt: ["$actividad_info", 0] }, // Propiedades de actividades
                // {
                //   asesor: {
                //     _id: { $arrayElemAt: ["$asesor_info._id", 0] },
                //     nombre: { $arrayElemAt: ["$asesor_info.nombre", 0] },
                //   },
                //   nota: "$actividades.nota",
                //   estadoAdm: "$actividades.estadoAdm",
                //   estadoAsesor: "$actividades.estadoAsesor",
                //   fechaVencimiento: "$actividades.fechaVencimiento",
                // },
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          fecha: 1,
          materia: 1,
          cliente: 1,
          estado: 1,
          actividades: 1,
          asignamiento: 1,
        },
      },
    ];
    // Ejecuta la consulta en tu base de datos

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
    console.log(response);
    return response;
  }

  insertDocuments(endpoint, document) {
    const payload = {
      documents: document,
      collection: this.collection,
      dataSource: this.dataSource,
      database: this.dataBase,
    };

    const options = this.createOptions(payload);
    const response = this.executeAPI(endpoint, options);
    console.log(response);
    return response;
  }
}
