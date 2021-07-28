const Cliente = require("../models/cliente.model");

exports.create = (req, res) => {
  console.log("reques",req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const cliente = new Cliente({   
  
    dpi : req.body.dpi,
    nit : req.body.nit,
    nombre : req.body.nombre,
    domicilio : req.body.domicilio,
    telefono_uno : req.body.telefono_uno,
    telefono_dos : req.body.telefono_dos,
    correo_electronico : req.body.correo_electronico
  });


  Cliente.create(cliente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cliente."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Cliente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found cliente with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving cliente with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


exports.update = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  const producto = new Cliente({
   
    dpi : req.body.dpi,
    nit : req.body.nit,
    nombre : req.body.nombre,
    domicilio : req.body.domicilio,
    telefono_uno : req.body.telefono_uno,
    telefono_dos : req.body.telefono_dos,
    correo_electronico : req.body.correo_electronico
  });

  Cliente.updateById(
    req.params.id,
    producto,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cliente with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cliente with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};




