const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'cosecha.ar2'
});

conexion.connect((err)=>{
        if(err){
            console.log('Error');
        }else{
            console.log('Conectado...')
        }
})

module.exports = conexion;

