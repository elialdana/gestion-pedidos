module.exports = app => {
  const cliente = require("../controllers/cliente.controller");

  
  // Create a new cliente
  app.post("/api/cliente", cliente.create);
  // Retrieve all cliente
  app.get("/api/cliente", cliente.findAll);
  // Retrieve a single cliente with id
  app.get("/api/cliente/:id", cliente.findOne);

  // Update a cliente with id
  app.put("/api/cliente/:id", cliente.update);



};

