module.exports = app => {
  const pedidoDet = require("../controllers/detalle-pedido.controller");

  
  // Create a new pedidoDet
  app.post("/detalle/pedido", pedidoDet.create);
  // Retrieve all pedidoDet
  app.get("/detalle/pedido", pedidoDet.findAll);
  // Retrieve a single pedidoDet with id
  app.get("/detalle/pedido/:id", pedidoDet.findOne);

  // Update a vpedidoDet with id
  app.put("/detalle/pedido/:id", pedidoDet.update);

  // Delete a pedidoDet with id
  app.delete("/detalle/pedido/:id", pedidoDet.delete);


};

