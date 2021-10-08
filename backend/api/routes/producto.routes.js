module.exports = app => {
  const producto = require("../controllers/producto.controller");

  
  // Create a new producto
  app.post("/api/producto", producto.create);
  // Retrieve all producto
  app.get("/api/producto", producto.findAll);
  // Retrieve a single producto with customerId
  app.get("/api/producto/:id", producto.findOne);

  // Update a producto with customerId
  app.put("/api/producto/:id", producto.update);

  // Delete a producto with customerId
  app.post("/api/producto/:id", producto.delete);


};

