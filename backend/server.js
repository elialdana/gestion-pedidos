const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//var argv = require('minimist')(process.argv.slice(2));
const cors = require("cors");


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors({origin:['http://localhost:4200']}));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require('./api/routes/producto.routes')(app);
require('./api/routes/proveedor.routes')(app);
require('./api/routes/cliente.routes')(app);
require('./api/routes/materiales-fabricacion.routes')(app);
require('./api/routes/pago-pedido.routes')(app);
require('./api/routes/pedido.routes')(app);
require('./api/routes/detalle-pedido.routes')(app);
require('./api/routes/usuario.routes')(app);
//require('./api/routes/materiales-utilizados.routes')(app);
// set port, listen for requestsprocess.env.PORT ||
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
