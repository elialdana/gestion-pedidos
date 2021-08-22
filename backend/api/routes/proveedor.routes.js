module.exports = app => {
  const proveedor = require("../controllers/proveedor.controller");

  
  // Create a new proveedor
  app.post("/api/proveedor", proveedor.create);
  // Retrieve all proveedor
  app.get("/api/proveedor", proveedor.findAll);
  // Retrieve a single proveedor with id
  app.get("/api/proveedor/:id", proveedor.findOne);

  // Update a proveedor with id
  app.put("/api/proveedor/:id", proveedor.update);

  // Delete a proveedor with id
  app.delete("/api/proveedor/:id", proveedor.delete);


};

