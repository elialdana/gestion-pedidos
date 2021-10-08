const MaterialesProveedor = require("../models/materiales-fabricacion.model");


exports.create = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  const materialesProveedor = new MaterialesProveedor({
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    proveedor_id: req.body.proveedor_id,
    descripcion: req.body.descripcion,
    precio_compra: req.body.precio_compra,
    precio_venta: req.body.precio_venta,
    telefono_notificacion: req.body.telefono_notificacion,
    email_notificacion: req.body.email_notificacion,
    stock: req.body.stock,
    fecha_registro: req.body.fecha_registro,
    fecha_modificacion: req.body.fecha_modificacion,
    estado: req.body.estado
  });


  MaterialesProveedor.create(materialesProveedor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MaterialesProveedor."
      });
    else res.send(data);
  });
};


exports.findAll = (req, res) => {
  MaterialesProveedor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  MaterialesProveedor.findById(req.params.id, (err, data) => {
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

  

  const materialesProveedor = new MaterialesProveedor({
    id: req.body.id,
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    proveedor: req.body.proveedor,
    descripcion: req.body.descripcion,
    precio_compra: req.body.precio_compra,
    precio_venta: req.body.precio_venta,
    telefono_notificacion: req.body.telefono_notificacion,
    email_notificacion: req.body.email_notificacion,
    stock: req.body.stock,
    fecha_registro: req.body.fecha_registro,
    fecha_modificacion: req.body.fecha_modificacion,
    estado: req.body.estado
  });

  MaterialesProveedor.updateById(
    materialesProveedor.id,
    materialesProveedor,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found MaterialesProveedor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating MaterialesProveedor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Producto with the specified id in the request
exports.delete = (req, res) => {
  MaterialesProveedor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found MaterialesProveedor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete MaterialesProveedor with id " + req.params.id
        });
      }
    } else res.send({ message: `MaterialesProveedor was deleted successfully!` });
  });
};


