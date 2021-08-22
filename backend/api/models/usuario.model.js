const sql = require("./db.js");

// constructor
const Usuario = function(user) {
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
  
  console.log("SELECT * FROM usuarios WHERE usuario = ?",[userID])
  sql.query("SELECT usuario, password, perfil FROM usuarios WHERE usuario = ?",[userID], (err, res) => {
    if (err) {
      console.log("error: ", err);
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

    console.log("banco_users: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, user, result) => {
  sql.query(
    "UPDATE usuarios SET dpi = ?, primernombre=?, segundonombre=?, cargo=?, primerapellido=?, segundoapellido=?, email=?, usuario=?, estado=?, codigopuntoasignado=?, password=? WHERE id = ?",
    [user.dpi, user.primernombre, user.segundonombre, user.cargo,user.primerapellido, user.segundoapellido,user.email, user.usuario, user.estado, user.codigopuntoasignado, user.password, id],
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
      user.id=id;
      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

module.exports = Usuario;
