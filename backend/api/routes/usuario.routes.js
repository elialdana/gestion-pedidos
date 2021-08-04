module.exports = app => {
  const users = require("../controllers/usuario.controller.js");

  app.post("/usuario", users.create);

  app.put("/usuario/:usuario", users.update);

  app.post("/usuario/authenticate",users.findLogin);
  app.post("/usuario/verifica/token",users.verificaToken);
  app.get("/usuario",users.findAll);
  app.get("/usuario/:usuario",users.findOne);
};