module.exports = app => {
  const materialesProveedor = require("../controllers/materiales-fabricacion.controller");

  
  // Create a new materialesProveedor
  app.post("/materialesProveedor", materialesProveedor.create);
  // Retrieve all materialesProveedor
  app.get("/materialesProveedor", materialesProveedor.findAll);
  // Retrieve a single materialesProveedor with id
  app.get("/materialesProveedormaterialesProveedor/:id", materialesProveedor.findOne);

  // Update a proveedor with id
  app.put("/materialesProveedor/:id", materialesProveedor.update);

  // Delete a materialesProveedor with id
  app.delete("/materialesProveedor/:id", materialesProveedor.delete);


};

