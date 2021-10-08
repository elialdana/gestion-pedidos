const PagoPedido = require("../models/pago-pedido.model");


exports.create = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const pago = new PagoPedido({
    pedido_id: req.body.pedido_id,
    abono: req.body.abono,
    fecha_abono: req.body.fecha_abono,
    descripcion: req.body.descripcion
  });


  PagoPedido.create(pago, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PagoPedido."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  PagoPedido.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    else res.send(data);
  });
};

exports.findAllByPadre = (req, res) => {
  PagoPedido.getAllByPadre(req.params.id,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    else res.send(data);
  });
};
exports.findOne = (req, res) => {
  PagoPedido.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PagoPedido with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving PagoPedido with id " + req.params.id
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

  

  const pago = new PagoPedido({
    pedido_id: req.body.pedido_id,
    abono: req.body.abono,
    fecha_abono: req.body.fecha_abono,
    descripcion: req.body.descripcion
  });

  PagoPedido.updateById(
    req.params.id,
    pago,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found pago with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating pago with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a PagoPedido with the specified id in the request
exports.delete = (req, res) => {
  PagoPedido.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found pago with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete pago with id " + req.params.id
        });
      }
    } else res.send({ message: `pago was deleted successfully!` });
  });
};


