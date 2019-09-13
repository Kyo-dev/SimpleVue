import mysqlConnection from '../database.key'
export function todosEmpleados(req, res){
    mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) =>{
        if(!err){
            res.json(rows)
        } else {
            console.log(err);
        }
    })
}
export function nuevoEmpleado(req, res) {
    console.log(req.body);
    res.send('recivido')
}