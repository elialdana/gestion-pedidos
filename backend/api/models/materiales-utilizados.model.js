const sql = require("./db.js");

// constructor
const MaterialesUtilizados = function(materiales) {

  this.material_id = materiales.material_id;
  this.detalle_pedido_id = materiales.detalle_pedido_id;
  this.cantidad = materiales.cantidad;
  this.unidad_medida = materiales.unidad_medida;

};

MaterialesUtilizados.create = (newMateriales, result) => {
  sql.query("INSERT INTO materiales_fabricacion SET ?", newMateriales, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created materiales: ", { id: res.insertId, ...newMateriales });
    result(null, { id: res.insertId, ...newMateriales });
  });
};

MaterialesUtilizados.findById = (materiales, result) => {
  sql.query(`SELECT * FROM materiales_fabricacion WHERE id = ${materiales}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found materiales: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found materiales with the id
    result({ kind: "not_found" }, null);
  });
};

MaterialesUtilizados.getAll = result => {
       
  sql.query("SELECT * FROM materiales_fabricacion",
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

MaterialesUtilizados.updateById = (id, materiales, result) => {
  sql.query(
    "UPDATE materiales_fabricacion SET NOMBRE = ?, DESCRIPCION = ?, stock =?, fecha_ingreso=?  WHERE id = ?",
    [materiales.nombre, materiales.descripcion, materiales.stock,materiales.fecha_ingreso, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found materiales with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated materiales: ", { id: id, ...materiales });
      result(null, { id: id, ...materiales });
    }
  );
};

MaterialesUtilizados.remove = (id, result) => {
  sql.query("update  materiales_fabricacion set estado='I' WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found materiales with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted materiales_fabricacion with id: ", id);
    result(null, res);
  });
};

MaterialesUtilizados.removeAll = result => {
  sql.query("DELETE FROM materiales_fabricacion", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} materiales_fabricacion`);
    result(null, res);
  });
};

module.exports = MaterialesUtilizados;
