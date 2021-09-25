module.exports = app => {
  const pago = require("../controllers/pago-pedido.controller");

  
  // Create a new pago
  app.post("/api/pago", pago.create);
  // Retrieve all pago
  app.get("/api/pago", pago.findAll);
  app.get("/api/pago/pedido/:id", pago.findAllByPadre);
  // Retrieve a single pago with customerId
  app.get("/api/pago/:id", pago.findOne);

  // Update a pago with customerId
  app.put("/api/pago/:id", pago.update);



};

