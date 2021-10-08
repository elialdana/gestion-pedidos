const Proveedor = require("../models/proveedor.model");
const Producto = require("../models/proveedor.model");


exports.create = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const proveedor = new Proveedor({   
  
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    descripcion: req.body.descripcion,
    correo_electronico: req.body.correo_electronico,
    direccion: req.body.direccion

  });


  Proveedor.create(proveedor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the proveedor."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  Proveedor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Proveedor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Proveedor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Proveedor with id " + req.params.id
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

  

  const producto = new Proveedor({
    id: req.body.id,
    nombre: req.body.nombre,
    telefono: req.body.telefono,
    descripcion: req.body.descripcion,
    correo_electronico: req.body.correo_electronico,
    direccion: req.body.direccion,
    estado: req.body.estado
  });

  Proveedor.updateById(
    producto.id,
    producto,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found producto with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating producto with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Producto with the specified id in the request
exports.delete = (req, res) => {
  Proveedor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Proveedor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Proveedor with id " + req.params.id
        });
      }
    } else res.send({ message: `Proveedor was Proveedor successfully!` });
  });
};


