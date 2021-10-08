const sql = require("./db.js");

// constructor
const productos = function(productos) {
  this.id = productos.id;
  this.codigo = productos.codigo;  
  this.nombre = productos.nombre;
  this.descripcion = productos.descripcion;
  this.estado = productos.estado;
  this.calcular_precio = productos.calcular_precio;
  this.precio_predeterminado = productos.precio_predeterminado;

};

productos.create = (newproductos, result) => {


  
  sql.query("INSERT INTO productos SET ?", newproductos, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    result(null, { id: res.insertId, ...newproductos });
  });
};

productos.findById = (productosId, result) => {
  sql.query(`SELECT * FROM productos WHERE id = ${productosId}`, (err, res) => {
    if (err) {
      
      result(err, null);
      return;
    }

    if (res.length) {
      
      result(null, res[0]);
      return;
    }

    // not found productos with the id
    result({ kind: "not_found" }, null);
  });
};

productos.getAll = result => {
  
  
  
   
  sql.query("SELECT * FROM productos where estado='A'",
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    
    result(null, res);
    return;
  });
};

productos.updateById = (id, productos, result) => {
  sql.query(
    "UPDATE productos SET nombre = ?, descripcion = ?, estado = ?,stock=?,codigo=?,proveedor_id WHERE id = ?",
    [productos.nombre, productos.descripcion,productos.estado,productos.stock,productos.codigo,productos.proveedor_id,id],
    (err, res) => {
      if (err) {
        
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found productos with the id
        result({ kind: "not_found" }, null);
        return;
      }

      
      result(null, { id: id, ...productos });
    }
  );
};

productos.remove = (id, result) => {
  sql.query("UPDATE productos SET ESTADO='I' WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found productos with the id
      result({ kind: "not_found" }, null);
      return;
    }

    
    result(null, res);
  });
};


module.exports = productos;
