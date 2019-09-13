import mysql from 'mysql'

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'rrhh_db'
})
mysqlConnection.connect(function(err){
    if(err){
        console.log(`DB error ${err}`)
    }else{
        console.log('DB is connected')
    }
});
module.exports = mysqlConnection