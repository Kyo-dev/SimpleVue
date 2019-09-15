import mysql from 'mysql'
import config from './config.key'

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: config.pass,
    multipleStatements: true,
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