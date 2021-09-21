const sql = require("./db.js");

// constructor
const Pedido  = function(pedidodetalle) {
  
  this.pedido_id = pedidodetalle.pedido_id;
  this.producto_id = pedidodetalle.producto_id;
  this.comentario = pedidodetalle.comentario;
  
  this.cantidad = pedidodetalle.cantidad;
  this.descuento = pedidodetalle.descuento;
  this.monto = pedidodetalle.monto;
  this.costo_instalacion = pedidodetalle.costo_instalacion;
  this.costo_adicional = pedidodetalle.costo_adicional;
};

Pedido.create = (newPedido, result) => {
  sql.query("INSERT INTO detalle_pedido_cliente SET ?", newPedido, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }else{
  

    result(null, { id: res.insertId, ...newPedido });
  }
  });
  
};

Pedido.findById = (id, result) => {
  sql.query(`SELECT * FROM detalle_pedido_cliente WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pedidodetalle: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found id with the id
    result({ kind: "not_found" }, null);
  });
};

Pedido.getAll = result => {
  
  
  
   
  sql.query("SELECT * FROM detalle_pedido_cliente",
   (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pedido_cliente: ", res);
    result(null, res);
    return;
  });
};

Pedido.updateById = (id, pedidodetalle, result) => {
  sql.query(
    "UPDATE detalle_pedido_cliente SET direccion = ?, estado = ?,  direccion = ? ,FECHA_ENTREGA=? WHERE id = ?",
    [pedidodetalle.direccion, pedidodetalle.estado, pedidodetalle.direccion,pedidodetalle.fecha_entrega, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found pedidodetalle with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pedidodetalle: ", { id: id, ...pedidodetalle });
      result(null, { id: id, ...pedidodetalle });
    }
  );
};

Pedido.remove = (id, result) => {
  sql.query("delete from  detalle_pedido_cliente  WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pedidodetalle with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted detalle_pedido_cliente with id: ", id);
    result(null, res);
  });
};



module.exports = Pedido;
