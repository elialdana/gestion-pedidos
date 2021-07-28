module.exports = app => {
  const producto = require("../controllers/producto.controller");

  
  // Create a new producto
  app.post("/producto", producto.create);
  // Retrieve all producto
  app.get("/producto", producto.findAll);
  // Retrieve a single producto with customerId
  app.get("/producto/:id", producto.findOne);

  // Update a producto with customerId
  app.put("/producto/:id", producto.update);

  // Delete a producto with customerId
  app.delete("/producto/:id", producto.delete);


};

