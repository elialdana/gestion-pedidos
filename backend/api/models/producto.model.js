const sql = require("./db.js");

// constructor
const Producto = function(producto) {
  this.id = producto.id;
  this.codigo = producto.codigo;  
  this.nombre = producto.nombre;
  this.descripcion = producto.descripcion;
  this.estado = producto.estado;
  this.calcular_precio = producto.calcular_precio;
  this.precio_predeterminado = producto.precio_predeterminado;

};

Producto.create = (newProducto, result) => {


  
  sql.query("INSERT INTO productos SET ?", newProducto, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    result(null, { id: res.insertId, ...newProducto });
  });
};

Producto.findById = (productoId, result) => {
  sql.query(`SELECT * FROM PRODUCTOS WHERE id = ${productoId}`, (err, res) => {
    if (err) {
      
      result(err, null);
      return;
    }

    if (res.length) {
      
      result(null, res[0]);
      return;
    }

    // not found Producto with the id
    result({ kind: "not_found" }, null);
  });
};

Producto.getAll = result => {
  
  
  
   
  sql.query("SELECT * FROM PRODUCTOS where estado='A'",
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

Producto.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE PRODUCTOS SET NOMBRE = ?, DESCRIPCION = ?, ESTADO = ? WHERE id = ?",
    [producto.nombre, producto.descripcion,producto.estado,id],
    (err, res) => {
      if (err) {
        
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Producto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      
      result(null, { id: id, ...producto });
    }
  );
};

Producto.remove = (id, result) => {
  sql.query("UPDATE PRODUCTOS SET ESTADO='I' WHERE id = ?", id, (err, res) => {
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

    
    result(null, res);
  });
};


module.exports = Producto;
