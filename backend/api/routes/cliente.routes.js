module.exports = app => {
  const cliente = require("../controllers/cliente.controller");

  
  // Create a new cliente
  app.post("/cliente", cliente.create);
  // Retrieve all cliente
  app.get("/cliente", cliente.findAll);
  // Retrieve a single cliente with id
  app.get("/cliente/:id", cliente.findOne);

  // Update a cliente with id
  app.put("/cliente/:id", cliente.update);



};

