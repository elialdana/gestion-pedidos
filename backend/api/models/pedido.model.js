const sql = require("./db.js");

// constructor
const Pedido  = function(pedido) {
  
  this.cliente_id = pedido.cliente_id;
  this.comentario = pedido.comentario;
  this.estado = pedido.estado;
  this.direccion = pedido.direccion;
  this.fecha_entrega = pedido.fecha_entrega;
  this.usuario_registro = pedido.usuario_registro;
  this.usuario_asignado = pedido.usuario_asignado;
  
};

Pedido.create = (newPedido, result) => {
  sql.query("INSERT INTO pedido_cliente SET ?", newPedido, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pedido: ", { id: res.insertId, ...newPedido });
    result(null, { id: res.insertId, ...newPedido });
  });
};

Pedido.findById = (id, result) => {
  sql.query(`SELECT * FROM pedido_cliente WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pedido: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found id with the id
    result({ kind: "not_found" }, null);
  });
};

Pedido.getAll = result => {
  
  
  
   
  sql.query("SELECT * FROM pedido_cliente",
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

Pedido.updateById = (id, pedido, result) => {
  sql.query(
    "UPDATE pedido_cliente SET direccion = ?, estado = ?,  direccion = ? ,FECHA_ENTREGA=? WHERE id = ?",
    [pedido.direccion, pedido.estado, pedido.direccion,pedido.fecha_entrega, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found pedido with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pedido: ", { id: id, ...pedido });
      result(null, { id: id, ...pedido });
    }
  );
};

Pedido.remove = (id, result) => {
  sql.query("update pedido_cliente set estado='C' WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pedido with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pedido with id: ", id);
    result(null, res);
  });
};



module.exports = Pedido;
