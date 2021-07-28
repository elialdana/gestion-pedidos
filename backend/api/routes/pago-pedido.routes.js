module.exports = app => {
  const pago = require("../controllers/pago-pedido.controller");

  
  // Create a new pago
  app.post("/pago", pago.create);
  // Retrieve all pago
  app.get("/pago", pago.findAll);
  // Retrieve a single pago with customerId
  app.get("/pago/:id", pago.findOne);

  // Update a pago with customerId
  app.put("/pago/:id", pago.update);

  // Delete a pago with customerId
  app.delete("/pago/:id", pago.delete);


};

