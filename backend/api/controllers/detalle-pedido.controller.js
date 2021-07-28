const PedidoDetalle = require("../models/detalle-pedido.model");


exports.create = (req, res) => {
  console.log("reques",req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const detalle = new PedidoDetalle({
    pedido_id : req.body.pedido_id,
    producto_id : req.body.producto_id,
    comentario : req.body.comentario,
    direccion : req.body.direccion,
    cantidad : req.body.cantidad,
    descuento : req.body.descuento,
    monto : req.body.monto,
    costo_instalacion : req.body.costo_instalacion,
    costo_adicional : req.body.costo_adicional
  });


  PedidoDetalle.create(detalle, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PedidoDetalle."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  PedidoDetalle.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  PedidoDetalle.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PedidoDetalle with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving PedidoDetalle with id " + req.params.id
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

  const detalle = new PedidoDetalle({
    pedido_id : req.body.pedido_id,
  producto_id : req.body.producto_id,
  comentario : req.body.comentario,
  direccion : req.body.direccion,
  cantidad : req.body.cantidad,
  descuento : req.body.descuento,
  monto : req.body.monto,
  costo_instalacion : req.body.costo_instalacion,
  costo_adicional : req.body.costo_adicional
  });

  PedidoDetalle.updateById(
    req.params.id,
    detalle,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found detalle with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating detalle with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a PedidoDetalle with the specified id in the request
exports.delete = (req, res) => {
  PedidoDetalle.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PedidoDetalle with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete PedidoDetalle with id " + req.params.id
        });
      }
    } else res.send({ message: `PedidoDetalle was deleted successfully!` });
  });
};


