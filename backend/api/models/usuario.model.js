const sql = require("./db.js");

// constructor
const Usuario = function(user) {
  console.log('modelo ',user)
  this.usuario=user.usuario;
    this.dpi= user.dpi;
    this.password=user.password;
    this.nombre=user.nombre;
    this.direccion=user.direccion;
    this.telefono=user.telefono;
    //this.email=user.email;
    this.perfil=user.perfil;
    this.foto=user.foto;
    this.estado=user.estado;
    

};

Usuario.create = (newUser, result) => {
  sql.query("INSERT INTO usuarios SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newUser.id=res.insertId;
    console.log("created user: ", { id: res,newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

Usuario.findById = (userID, result) => {
  
  
  sql.query("SELECT usuario,nombre, password, perfil FROM usuarios WHERE usuario = ?",[userID], (err, res) => {
    if (err) {
      console.log("error: ", err);userID
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Catalogo with the id
    result({ kind: "not_found" }, null);
  });
};



Usuario.getAll = result => {
  sql.query("SELECT * FROM usuarios where estado='A'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    
    result(null, res);
  });
};

Usuario.updateById = (id, user, result) => {
  console.log(id)
  sql.query(
    "UPDATE usuarios SET dpi = ?,nombre=?, direccion=?,  perfil=?  WHERE usuario = ? ",
    [user.dpi, user.nombre, user.direccion, user.perfil, user.usuario],
    (err, res) => {
      console.log("res: ", res);
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
     
      console.log("updated user: ", { id: id, ...user });
      result(null, {...user });
    }
  );
};

Usuario.desactivar = (id, result) => {
  console.log(id)
  sql.query(
    "UPDATE usuarios SET estado='I' WHERE usuario = ? ",
    [ id],
    (err, res) => {
      
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
     
      
      result(null, true);
    }
  );
};
module.exports = Usuario;
