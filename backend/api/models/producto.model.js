const sql = require("./db.js");

// constructor
const Producto = function(producto) {
  this.id = producto.id;
  this.codigo = producto.codigo;
  this.nombre = producto.nombre;
  this.descripcion = producto.descripcion;
  this.fecha_registro = producto.fecha_registro;
  this.fecha_modificacion = producto.fecha_modificacfion;
  this.usuario_registro = producto.usuario_registro;
  this.usuario_modifica_id = producto.usuario_modifica_id;

};

Producto.create = (newProducto, result) => {


  console.log('Producto que llega ',newProducto);
  sql.query("INSERT INTO TLC_PRODUCTOS SET ?", newProducto, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created producto: ", { id: res.insertId, ...newProducto });
    result(null, { id: res.insertId, ...newProducto });
  });
};

Producto.findById = (productoId, result) => {
  sql.query(`SELECT * FROM TLC_PRODUCTOS WHERE id = ${productoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found producto: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Producto with the id
    result({ kind: "not_found" }, null);
  });
};

Producto.getAll = result => {
  
  
  console.log(" ingresando a getall");
   
  sql.query("SELECT * FROM tlc_pedidos.TLC_PRODUCTOS",
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

Producto.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE TLC_PRODUCTOS SET NOMBRE = ?, DESCRIPCION = ?,  FECHA_MODIFICACION = ? , USUARIO_MODIFICA_ID = ?  WHERE id = ?",
    [producto.nombre, producto.descripcion, producto.fecha_modificacion,producto.usuario_modifica_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Producto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated producto: ", { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

Producto.remove = (id, result) => {
  sql.query("DELETE FROM TLC_PRODUCTOS WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Producto with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted TLC_PRODUCTOS with id: ", id);
    result(null, res);
  });
};

Producto.removeAll = result => {
  sql.query("DELETE FROM TLC_PRODUCTOS", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} TLC_PRODUCTOS`);
    result(null, res);
  });
};

module.exports = Producto;
