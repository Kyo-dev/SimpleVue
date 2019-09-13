import mysqlConnection from '../database.key'
export async function todosEmpleados(req, res){
    await mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) =>{
        if(!err){
            res.json(rows)
        } else {
            console.log(err);
        }
    })
}
export async function empleadoDNI(req, res){
    const {cedula} = req.params
    await mysqlConnection.query('SELECT * FROM empleados WHERE cedula = ?', [cedula], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0])
        } else{
            console.log(err)
        }
    })
}
export function nuevoEmpleado(req, res) {
    console.log(req.body);
    res.send('recivido')
}