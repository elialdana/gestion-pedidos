const sql = require("./db.js");

// constructor
const Proveedor  = function(proveedor) {
  this.id = proveedor.id;
  this.codigo = proveedor.codigo;
  this.nombre = proveedor.nombre;
  this.descripcion = proveedor.descripcion;
  this.fecha_registro = proveedor.fecha_registro;
  this.fecha_modificacion = proveedor.fecha_modificacfion;
  this.usuario_registro_id = proveedor.usuario_registro_id;
  this.usuario_modifica_id = proveedor.usuario_modifica_id;

};

Proveedor.create = (newProveedor, result) => {
  sql.query("INSERT INTO TLC_PROVEEDORES SET ?", newProveedor, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created proveedor: ", { id: res.insertId, ...newProveedor });
    result(null, { id: res.insertId, ...newProveedor });
  });
};

Proveedor.findById = (proveedorId, result) => {
  sql.query(`SELECT * FROM TLC_PROVEEDORES WHERE id = ${proveedorId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found proveedor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found proveedorId with the id
    result({ kind: "not_found" }, null);
  });
};

Proveedor.getAll = result => {
  
  
  
   
  sql.query("SELECT * FROM tlc_pedidos.TLC_PROVEEDORES",
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("proveedores: ", res);
    result(null, res);
    return;
  });
};

Proveedor.updateById = (id, proveedor, result) => {
  sql.query(
    "UPDATE TLC_PROVEEDORES SET NOMBRE = ?, DESCRIPCION = ?,  FECHA_MODIFICACION = ? , USUARIO_MODIFICA_ID = ?  WHERE id = ?",
    [proveedor.nombre, proveedor.descripcion, proveedor.fecha_modificacion,proveedor.usuario_modifica_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found proveedor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated proveedor: ", { id: id, ...proveedor });
      result(null, { id: id, ...proveedor });
    }
  );
};

Proveedor.remove = (id, result) => {
  sql.query("DELETE FROM TLC_PROVEEDORES WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found proveedor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted TLC_PROVEEDORES with id: ", id);
    result(null, res);
  });
};

Proveedor.removeAll = result => {
  sql.query("DELETE FROM TLC_PROVEEDORES", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} TLC_PROVEEDORES`);
    result(null, res);
  });
};

module.exports = Proveedor;
