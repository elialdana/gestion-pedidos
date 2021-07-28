module.exports = app => {
  const pedido = require("../controllers/pedido.controller");

  
  // Create a new pedido
  app.post("/pedido", pedido.create);
  // Retrieve all pedido
  app.get("/pedido", pedido.findAll);
  // Retrieve a single pedido with id
  app.get("/pedido/:id", pedido.findOne);

  // Update a pedido with id
  app.put("/pedido/:id", pedido.update);

  // Delete a pedido with id
  app.delete("/pedido/:id", pedido.delete);


};

