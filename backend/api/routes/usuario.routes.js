module.exports = app => {
  const users = require("../controllers/usuario.controller.js");

  app.post("/api/usuario", users.create);

  app.put("/api/usuario/:usuario", users.update);

  app.post("/usuario/authenticate",users.findLogin);
  app.post("/api/usuario/verifica/token",users.verificaToken);
  app.get("/api/usuario",users.findAll);
  app.get("/api/usuario/:usuario",users.findOne);
};