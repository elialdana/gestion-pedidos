const sql = require("./db.js");

// constructor
const PagoPedido = function(pago) {
  this.id = pago.id;
  this.pedido_id = pago.pedido_id;
  this.abono = pago.abono;
  this.fecha_abono = pago.fecha_abono;
  this.descripcion = pago.descripcion;



};

PagoPedido.create = (newPagoPedido, result) => {


  console.log('PagoPedido que llega ',newPagoPedido);
  sql.query("INSERT INTO PAGOS_PEDIDO SET ?", newPagoPedido, (err, res) => {
   
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pago: ", { id: res.insertId, ...newPagoPedido });
    result(null, { id: res.insertId, ...newPagoPedido });
  });
};

PagoPedido.findById = (pagoPedidoId, result) => {
  sql.query(`SELECT * FROM PAGOS_PEDIDO WHERE id = ${pagoPedidoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pago: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found PagoPedido with the id
    result({ kind: "not_found" }, null);
  });
};

PagoPedido.getAll = result => {
  
  
  console.log(" ingresando a getall");
   
  sql.query("SELECT * FROM PAGOS_PEDIDO",
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

PagoPedido.updateById = (id, pago, result) => {
  sql.query(
    "UPDATE PAGOS_PEDIDO SET NOMBRE = ?, DESCRIPCION = ?, ESTADO = ? WHERE id = ?",
    [pago.nombre, pago.descripcion,pago.estado,id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PagoPedido with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pago: ", { id: id, ...pago });
      result(null, { id: id, ...pago });
    }
  );
};


module.exports = PagoPedido;
