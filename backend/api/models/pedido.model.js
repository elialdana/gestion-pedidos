const sql = require("./db.js");

// constructor
const Pedido  = function(pedido) {
  this.id = pedido.id;
  this.cliente_id = pedido.cliente_id;
  this.comentario = pedido.comentario;
  this.total = pedido.total;
  this.total_pendiente = pedido.total;
  this.estado = pedido.estado;
  this.direccion = pedido.direccion;
  this.fecha_entrega = pedido.fecha_entrega;
  this.usuario_registro = pedido.usuario_registro;
  this.usuario_modifica = pedido.usuario_modifica;
  this.usuario_asignado = pedido.usuario_asignado;
  
};

Pedido.create = (newPedido, result) => {
  console.log("creando pedido ");
  sql.query("INSERT INTO pedidos SET ?", newPedido, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pedido: ", { res });
    result(null, res );
  });
};

Pedido.findById = (id, result) => {
  sql.query(`SELECT * FROM pedidos WHERE id = ${id}`, (err, res) => {
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
  
  
   
  sql.query("SELECT c.nombre as clienteNombre,p.* FROM pedidos p INNER JOIN clientes c ON p.cliente_id=c.id",
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

Pedido.updateById = (id, pedido, result) => {

  sql.query(
    "UPDATE pedidos SET usuario_asignado = ?, estado = ?,  FECHA_ENTREGA=?,FECHA_MODIFICACION=? WHERE id = "+id,
    [pedido.usuario_asignado, pedido.estado,pedido.fecha_entrega,new Date()],
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
  sql.query("update pedidos set estado='C' WHERE id = ?", id, (err, res) => {
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
