const Producto = require("../models/producto.model");


exports.create = (req, res) => {
  console.log("reques",req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const producto = new Producto({
    codigo: req.body.codigo,
    proveedor_id: req.body.proveedor_id,    
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado
  });


  Producto.create(producto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  Producto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Producto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.id
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

  const producto = new Producto({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado
  });

  Producto.updateById(
    req.params.id,
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
  Producto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found producto with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete producto with id " + req.params.id
        });
      }
    } else res.send({ message: `producto was deleted successfully!` });
  });
};


