module.exports = app => {
  const pedido = require("../controllers/pedido.controller");

  
  // Create a new pedido
  app.post("/api/pedido", pedido.procesarPedido);
  // Retrieve all pedido
  app.get("/api/pedido", pedido.findAll);
  // Retrieve a single pedido with id
  app.get("/api/pedido/:id", pedido.findOne);

  // Update a pedido with id
  app.put("/api/pedido/:id", pedido.update);

  // Delete a pedido with id
  app.delete("/api/pedido/:id", pedido.delete);


};

