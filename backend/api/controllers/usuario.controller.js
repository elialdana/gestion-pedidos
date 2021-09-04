const Usuario = require("../models/usuario.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const usuario = new Usuario({
    usuario:req.body.usuario,
    dpi: req.body.dpi,
    password:req.body.password,
    email:req.body.email,
    nombre:req.body.nombre,
    direccion:req.body.direccion,
    telefono:req.body.telefono,
    perfil:req.body.perfil,
    foto:req.body.foto,
    estado:req.body.estado
  });

  // Save Customer in the database
  Usuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Catalogo."
      });
    else res.send(data);
  });
};

// Retrieve all Catalogo from the database.
exports.findAll = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Usuario.findById(req.params.usuario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.usuario}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.usuario
        });
      }
    } else res.send(data);
  });
};

//login method
exports.findLogin = (req, res) => {
 // console.log("se le envia estoooooo", req.body.usuario);


 const jwt = require('jsonwebtoken');
 var resp ={
  respuesta:false,
  token:null,
  
  };

  console.log(req.body)
 Usuario.findById(req.body.usuario, (err, data) => {

  const {usuario,nombre,password,perfil} =data;

   console.log('ESTO RETORNA',data);
   resp.respuesta=false;
   if(data!=null){
    
    console.log('pass',req.body.password)
    console.log('password===req.body.password ',password===req.body.password);
   if(usuario===req.body.usuario && password===req.body.password){
      console.log('login', 'OK');
      const token = jwt.sign({usuario,nombre,perfil},'umg',{expiresIn:'1h'})
    

      resp.respuesta=true;
      resp.token =token;
        res.status(200).send(resp);
    }
  }
   
  });
};


exports.verificaToken = (req,res)=>{
  if(!req.headers.authorization) return res.status(401).json('No autorizado');
  const jwt = require('jsonwebtoken');
  const token = req.headers.authorization.substr(7);
  console.log(token)
  if(token!==''){
    const content = jwt.verify(token, 'umg')
    req.data = content;
    res.status(200).json('Token correcto');
  }else{
    res.status(401).json('Token vacio');
  }

};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  Usuario.updateById(
    req.params.id,
    new Usuario (req.body),
    (err, data) => {
      console.log('dataaaaaaa',data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

