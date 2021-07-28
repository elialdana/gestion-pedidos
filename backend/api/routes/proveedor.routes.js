module.exports = app => {
  const proveedor = require("../controllers/proveedor.controller");

  
  // Create a new proveedor
  app.post("/proveedor", proveedor.create);
  // Retrieve all proveedor
  app.get("/proveedor", proveedor.findAll);
  // Retrieve a single proveedor with id
  app.get("/proveedor/:id", proveedor.findOne);

  // Update a proveedor with id
  app.put("/proveedor/:id", proveedor.update);

  // Delete a proveedor with id
  app.delete("/proveedor/:id", proveedor.delete);


};

