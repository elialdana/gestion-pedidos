const Producto = require("../models/producto.model");


exports.create = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  if(!req.headers.authorization) return res.status(401).json('No autorizado');
  const jwt = require('jsonwebtoken');
  const token = req.headers.authorization.substr(7);
  
  if(token==''){
    res.status(401).json('Token vacio');
   
  }

  const content = jwt.verify(token, 'umg')
  
  if(!content){
    res.status(401).json('Token invalido');
  }

  const producto = new Producto({
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    calcular_precio: req.body.estado,
    precio_predeterminado: req.body.precio_predeterminado

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
  if(!req.headers.authorization) return res.status(401).json('No autorizado');
  const jwt = require('jsonwebtoken');
  const token = req.headers.authorization.substr(7);
  
  if(token==''){
    res.status(401).json('Token vacio');
   
  }

  const content = jwt.verify(token, 'umg')
  
  if(!content){
    res.status(401).json('Token invalido');
  }
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
  if(!req.headers.authorization) return res.status(401).json('No autorizado');
  const jwt = require('jsonwebtoken');
  const token = req.headers.authorization.substr(7);
  
  if(token==''){
    res.status(401).json('Token vacio');
   
  }

  const content = jwt.verify(token, 'umg')
  
  if(!content){
    res.status(401).json('Token invalido');
  }
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
  if(!req.headers.authorization) return res.status(401).json('No autorizado');
  const jwt = require('jsonwebtoken');
  const token = req.headers.authorization.substr(7);
  
  if(token==''){
    res.status(401).json('Token vacio');
   
  }

  const content = jwt.verify(token, 'umg')
  
  if(!content){
    res.status(401).json('Token invalido');
  }
  

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


exports.delete = (req, res) => {
  if(!req.headers.authorization) return res.status(401).json('No autorizado');
  const jwt = require('jsonwebtoken');
  const token = req.headers.authorization.substr(7);
  
  if(token==''){
    res.status(401).json('Token vacio');
   
  }

  const content = jwt.verify(token, 'umg')
  
  if(!content){
    res.status(401).json('Token invalido');
  }
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


