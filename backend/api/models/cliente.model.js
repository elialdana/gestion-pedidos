const sql = require("./db.js");

// constructor
const Cliente = function(cliente) {
  this.id = cliente.id;
  this.dpi = cliente.dpi;
  this.nit = cliente.nit;
  this.nombre = cliente.nombre;
  this.domicilio = cliente.domicilio;
  this.telefono_uno = cliente.telefono_uno;
  this.telefono_dos = cliente.telefono_dos;
  this.correo_electronico = cliente.correo_electronico;
  this.fecha_ingreso = cliente.fecha_ingreso;
  this.fecha_modificacion = cliente.fecha_modificacion;
  this.usuario_registro_id = cliente.usuario_registro_id;
  this.usuario_modifica_id = cliente.usuario_modifica_id;

};

Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO TLC_CLIENTES SET ?", newCliente, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cliente: ", { id: res.insertId, ...newCliente });
    result(null, { id: res.insertId, ...newCliente });
  });
};

Cliente.findById = (clienteId, result) => {
  sql.query(`SELECT * FROM TLC_CLIENTES WHERE id = ${clienteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cliente: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cliente with the id
    result({ kind: "not_found" }, null);
  });
};

Cliente.getAll = result => {
  
  
  
   
  sql.query("SELECT * FROM tlc_pedidos.TLC_CLIENTES",
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clientes: ", res);
    result(null, res);
    return;
  });
};

Cliente.updateById = (id, cliente, result) => {
  sql.query(
    "UPDATE TLC_CLIENTES SET NOMBRE = ?, DESCRIPCION = ?,  FECHA_MODIFICACION = ? , USUARIO_MODIFICA_ID = ?  WHERE id = ?",
    [cliente.nombre, cliente.descripcion, cliente.fecha_modificacion,cliente.usuario_modifica_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Cliente with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cliente: ", { id: id, ...cliente });
      result(null, { id: id, ...cliente });
    }
  );
};

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM TLC_CLIENTES WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cliente with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted TLC_CLIENTES with id: ", id);
    result(null, res);
  });
};

Cliente.removeAll = result => {
  sql.query("DELETE FROM TLC_CLIENTES", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} TLC_CLIENTES`);
    result(null, res);
  });
};

module.exports = Cliente;
