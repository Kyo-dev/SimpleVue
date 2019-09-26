import mysqlConnection from '../database.key'

export async function nuevasVacaciones(req, res) {
    const {_cedula, _fecha_salida, _fecha_entrada} = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha_salida = ?;
        SET @_fecha_entrada = ?;
        CALL nuevasVacaciones (@_cedula, @_fecha_salida , @_fecha_entrada);
    `
    await mysqlConnection.query(query, [_cedula, _fecha_salida, _fecha_entrada], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({Status: err})
    })
}

export async function obtenerVacaciones(req, res) {
    const query = `
        select a.id, b.cedula, b.nombre, b.p_apellido, a.fecha_salida, a.fecha_entrada from vacaciones a
        inner join empleados b on a.cedula_empleado = b.cedula where a.activo = true;
    `
    await mysqlConnection.query(query, (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({Status: err})
    })
}

export async function actualizarVacaciones(req, res) {
    const {_id, _fecha_salida, _fecha_entrada} = req.body
    const query = `
        SET @_id = ?;
        SET @_fecha_salida = ?;
        SET @_fecha_entrada = ?;
        CALL actualizarVacaciones(@_id, @_fecha_salida, @_fecha_entrada);
    `    
    await mysqlConnection.query(query, [_id, _fecha_salida, _fecha_entrada], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({Status: err})
    })
}

export async function eliminarVacaciones(req, res) {
    const {_id} = req.body
    const query = `
        SET @_id = ?;
        CALL eliminarVacaciones(@_id);
    `
    await mysqlConnection.query(query, [_id], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({Status: err})
    })
}