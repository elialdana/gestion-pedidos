const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pedidos',
  port: '3306'

  
});

mysqlConnection.connect( err => {
  if(err){
    console.log('Error en db: ', err);
    return;
  }else{
    console.log('Db ok');
  }
});

module.exports = mysqlConnection;