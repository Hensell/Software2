const mysql = require('mysql');

const mysqlConnection= mysql.createConnection({
host: 'localhost',
user: 'root',
password: '123456',
database: 'proyectosoftware2',
port: '3306'


});

mysqlConnection.connect(err =>{

if(err){
console.log('Error en la conexion con la base de datos: ',err);
return;
}else{

    console.log("Conectado exitosamente");
}

});

module.exports=mysqlConnection;