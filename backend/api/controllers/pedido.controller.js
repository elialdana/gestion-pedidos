const Pedido = require("../models/pedido.model");


exports.create = (req, res) => {
  console.log("reques",req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const pedido = new Pedido({
    cliente_id: req.body.cliente_id,
    comentario: req.body.comentario,
    estado: req.body.estado,
    direccion: req.body.direccion,
    fecha_entrega: req.body.fecha_entrega,
    usuario_registro: req.body.usuario_registro,
    usuario_asignado: req.body.usuario_asignado
  });


  Pedido.create(pedido, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  Pedido.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Pedido.findById(req.params.id, (err, data) => {
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

  const pedido = new Pedido({
    cliente_id: req.body.cliente_id,
    comentario: req.body.comentario,
    estado: req.body.estado,
    direccion: req.body.direccion,
    fecha_entrega: req.body.fecha_entrega,
    usuario_registro: req.body.usuario_registro,
    usuario_asignado: req.body.usuario_asignado
  });

  Pedido.updateById(
    req.params.id,
    pedido,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found pedido with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating pedido with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Pedido with the specified id in the request
exports.delete = (req, res) => {
  Pedido.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pedido with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete pedido with id " + req.params.id
        });
      }
    } else res.send({ message: `pedido was deleted successfully!` });
  });
};


