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
};

Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
   
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
  sql.query(`SELECT * FROM clientes WHERE id = ${clienteId}`, (err, res) => {
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
  
  
  
   
  sql.query("SELECT * FROM clientes",
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
    "UPDATE clientes SET NOMBRE = ?, telefono_uno=? , telefono_dos=?, domicilio=?, correo_electronico=?, dpi=?, nit=? WHERE id = ?",
    [cliente.nombre,cliente.telefono_uno,cliente.telefono_dos,cliente.domicilio,cliente.correo_electronico, cliente.dpi,cliente.nit, id],
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


module.exports = Cliente;
