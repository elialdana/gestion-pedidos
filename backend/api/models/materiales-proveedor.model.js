const sql = require("./db.js");

// constructor
const MaterialesProveedor = function(materialesProveedor) {
  this.id = materialesProveedor.id;
  this.codigo = materialesProveedor.codigo;
  this.nombre = materialesProveedor.nombre;
  this.proveedor = materialesProveedor.proveedor;
  this.descripcion = materialesProveedor.descripcion;
  this.precio_compra = materialesProveedor.precio_compra;
  this.precio_venta = materialesProveedor.precio_venta;
  this.stock = materialesProveedor.stock;
  this.fecha_registro = materialesProveedor.fecha_registro;
  this.fecha_modificacion = materialesProveedor.fecha_modificacfion;
  this.usuario_registro_id = materialesProveedor.usuario_registro_id;
  this.usuario_modifica_id = materialesProveedor.usuario_modifica_id;

};

MaterialesProveedor.create = (newMaterialesProveedor, result) => {
  sql.query("INSERT INTO TLC_MATERIALES_PROVEEDOR SET ?", newMaterialesProveedor, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created materialesProveedor: ", { id: res.insertId, ...newMaterialesProveedor });
    result(null, { id: res.insertId, ...newMaterialesProveedor });
  });
};

MaterialesProveedor.findById = (materialesProveedorId, result) => {
  sql.query(`SELECT * FROM TLC_MATERIALES_PROVEEDOR WHERE id = ${materialesProveedorId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found materialesProveedor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found MaterialesProveedor with the id
    result({ kind: "not_found" }, null);
  });
};

MaterialesProveedor.getAll = result => {
       
  sql.query("SELECT * FROM tlc_pedidos.TLC_MATERIALES_PROVEEDOR",
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productos: ", res);
    result(null, res);
    return;
  });
};

MaterialesProveedor.updateById = (id, materialesProveedor, result) => {
  sql.query(
    "UPDATE TLC_MATERIALES_PROVEEDOR SET NOMBRE = ?, DESCRIPCION = ?,  FECHA_MODIFICACION = ? , USUARIO_MODIFICA_ID = ?  WHERE id = ?",
    [materialesProveedor.nombre, materialesProveedor.descripcion, materialesProveedor.fecha_modificacion,materialesProveedor.usuario_modifica_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found MaterialesProveedor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated materialesProveedor: ", { id: id, ...materialesProveedor });
      result(null, { id: id, ...materialesProveedor });
    }
  );
};

MaterialesProveedor.remove = (id, result) => {
  sql.query("DELETE FROM TLC_MATERIALES_PROVEEDOR WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found MaterialesProveedor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted TLC_MATERIALES_PROVEEDOR with id: ", id);
    result(null, res);
  });
};

MaterialesProveedor.removeAll = result => {
  sql.query("DELETE FROM TLC_MATERIALES_PROVEEDOR", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} TLC_MATERIALES_PROVEEDOR`);
    result(null, res);
  });
};

module.exports = MaterialesProveedor;
