module.exports = app => {
  const materiales = require("../controllers/materiales-utilizados.controller");

  
  // Create a new materialesProveedor
  app.post("/materiales/utilizados", materiales.create);
  // Retrieve all materialesProveedor
  app.get("/materiales/utilizados", materiales.findAll);
  // Retrieve a single materialesProveedor with id
  app.get("/materiales/utilizados/:id", materiales.findOne);

  // Update a proveedor with id
  app.put("/materiales/utilizados/:id", materiales.update);

  // Delete a materialesProveedor with id
  app.delete("/materiales/utilizados/:id", materiales.delete);


};

