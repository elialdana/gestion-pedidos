const sql = require("./db.js");

// constructor
const Proveedor  = function(proveedor) {
  this.id = proveedor.id;
  this.nombre = proveedor.nombre;
  this.telefono = proveedor.telefono;
  this.descripcion = proveedor.descripcion;
  this.correo_electronico = proveedor.correo_electronico;
  this.direccion = proveedor.direccion;
  this.estado = proveedor.estado;

};

Proveedor.create = (newProveedor, result) => {
  sql.query("INSERT INTO proveedores SET ?", newProveedor, (err, res) => {
   
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
  sql.query(`SELECT * FROM proveedores WHERE id = ${proveedorId}`, (err, res) => {
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
  
  
  
   
  sql.query("SELECT * FROM proveedores",
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
    "UPDATE proveedores SET NOMBRE = ?, DESCRIPCION = ?,  direccion = ? , telefono = ?, correo_electronico=?  WHERE id = ?",
    [proveedor.nombre, proveedor.descripcion, proveedor.direccion,proveedor.telefono,proveedor.correo_electronico, id],
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
  sql.query("update proveedores set estado='I' WHERE id = ?", id, (err, res) => {
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

    console.log("deleted proveedor with id: ", id);
    result(null, res);
  });
};



module.exports = Proveedor;
