const sql = require("./db.js");

// constructor
const MaterialesFabricacion = function(materialesFabricacion) {
  this.id = materialesFabricacion.id;
  this.codigo = materialesFabricacion.codigo;
  this.nombre = materialesFabricacion.nombre;
  this.proveedor_id = materialesFabricacion.proveedor_id;
  this.descripcion = materialesFabricacion.descripcion;
  this.precio_compra = materialesFabricacion.precio_compra;
  this.precio_venta = materialesFabricacion.precio_venta;
  this.telefono_notificacion = materialesFabricacion.telefono_notificacion;
  this.email_notificacion = materialesFabricacion.email_notificacion;
  this.stock = materialesFabricacion.stock;
  this.fecha_registro = new Date();
  this.fecha_modificacion = materialesFabricacion.fecha_modificacion;
  this.estado = materialesFabricacion.estado;

};

MaterialesFabricacion.create = (newMaterialesFabricacion, result) => {
  sql.query("INSERT INTO materiales SET ?", newMaterialesFabricacion, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created materialesFabricacion: ", { id: res.insertId, ...newMaterialesFabricacion });
    result(null, { id: res.insertId, ...newMaterialesFabricacion });
  });
};

MaterialesFabricacion.findById = (materialesFabricacion, result) => {
  sql.query(`SELECT * FROM materiales WHERE id = ${materialesFabricacion}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found materialesFabricacion: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found MaterialesFabricacion with the id
    result({ kind: "not_found" }, null);
  });
};

MaterialesFabricacion.getAll = result => {
       
  sql.query("SELECT * FROM materiales where estado='A'",
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

MaterialesFabricacion.updateById = (id, materialesFabricacion, result) => {
  sql.query(
    "UPDATE materiales SET NOMBRE = ?, DESCRIPCION = ?, stock =?,telefono_notificacion=?,  email_notificacion=? ,fecha_modifico=CURRENT_TIMESTAMP() WHERE id = ?",
    [materialesFabricacion.nombre, materialesFabricacion.descripcion, materialesFabricacion.stock,materialesFabricacion.telefono_notificacion,materialesFabricacion.email_notificacion ,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found MaterialesFabricacion with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated materialesFabricacion: ", { id: id, ...materialesFabricacion });
      result(null, { id: id, ...materialesFabricacion });
    }
  );
};

MaterialesFabricacion.remove = (id, result) => {
  sql.query("update  materiales set estado='I' WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found MaterialesFabricacion with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted materiales with id: ", id);
    result(null, res);
  });
};


module.exports = MaterialesFabricacion;
