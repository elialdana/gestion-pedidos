module.exports = app => {
  const materialesProveedor = require("../controllers/materiales-fabricacion.controller");

  
  // Create a new materialesProveedor
  app.post("/api/materialesProveedor", materialesProveedor.create);
  // Retrieve all materialesProveedor
  app.get("/api/materialesProveedor", materialesProveedor.findAll);
  // Retrieve a single materialesProveedor with id
  app.get("/api/materialesProveedor/:id", materialesProveedor.findOne);

  // Update a proveedor with id
  app.put("/api/materialesProveedor/:id", materialesProveedor.update);

  // Delete a materialesProveedor with id
  app.delete("/api/materialesProveedor/:id", materialesProveedor.delete);


};

