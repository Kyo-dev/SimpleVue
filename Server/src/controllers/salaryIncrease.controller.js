import mysqlConnection from '../database.key'

export async function nuevoAumento(req, res) {
    const {_dni, _date, _increase} = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_aumento_salarial = ?;
        CALL nuevoAumento(@_cedula, @_fecha, @_aumento_salarial)
    `
    await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_dni], (err, rows, fields)=>{
        if(!err){
            mysqlConnection.query(query, [_dni, _date, _increase], (err, rows, fields)=>{
                !err ? res.json({Status: "OK"}) : res.json({Status: err})
            })
        }else{
            console.log('Error en la cedula')
            res.json({Status: err})
        }
    })
}

export async function todosAumentos(req, res) {
    await mysqlConnection.query(`select a.id, a.cedula_empleado, c.salario_hora, a.cantidad, a.fecha, b.nombre, b.p_apellido, b.activo from aumento_salarial a
    inner join empleados b on a.cedula_empleado = b.cedula
    inner join salarios c on c.cedula_empleado = b.cedula`, (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({Status: err})
    })
}

export async function aumentoDNI(req, res) {
    const {_dni} = req.params
    await mysqlConnection.query(`select a.id, a.cedula_empleado, c.salario_hora, a.cantidad, a.fecha, b.nombre, b.p_apellido, b.activo from aumento_salarial a
    inner join empleados b on a.cedula_empleado = b.cedula
    inner join salarios c on c.cedula_empleado = b.cedula where cedula = ?`, [_dni], (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({Status: err})
    })
}
