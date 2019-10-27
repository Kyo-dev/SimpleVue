import mysqlConnection from '../database.key'

export async function nuevasVacaciones(req, res) {
    const { _cedula, _fecha_salida, _fecha_entrada } = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha_salida = ?;
        SET @_fecha_entrada = ?;
        CALL nuevasVacaciones(@_cedula, @_fecha_salida , @_fecha_entrada);
    `
    await mysqlConnection.query("Select distinct(activo) from vacaciones where cedula_empleado = ?;", [_cedula], (err, rows, fields) => {
        const data = JSON.stringify(rows[0])
        console.log("data")
        console.log(data.substring(10, data.length - 1))
        if(data.substring(10, data.length - 1) == 0 ){
            console.log("CONSOLA")
            mysqlConnection.query(query, [_cedula, _fecha_salida, _fecha_entrada], (err, rows, fields) => {
                console.log(_cedula)
                console.log(_fecha_salida)
                console.log(_fecha_entrada)
                !err ? res.json({ Status: "OK" }) : res.json({ Status: err })
            })
        }else{
            res.json({Message: "El usuario ya tiene vacaciones programadas"})
        }
    })
}

export async function obtenerVacaciones(req, res) {
    const query = `
        select a.id, b.cedula, b.nombre, b.p_apellido, a.fecha_salida, a.fecha_entrada from vacaciones a
        inner join empleados b on a.cedula_empleado = b.cedula where a.activo = true;
    `
    await mysqlConnection.query(query, (err, rows, fields) => {
        !err ? res.json(rows) : res.json({ Status: err })
    })
}

export async function obtenerVacacionesEmpleado(req, res) {
    const {_cedula} = req.params
    const query = `
    select a.id, b.cedula, b.nombre, b.p_apellido, a.fecha_salida, a.fecha_entrada from vacaciones a
    inner join empleados b on a.cedula_empleado = b.cedula where a.activo = true and b.cedula = ${_cedula};
    `
    await mysqlConnection.query(query, (err, rows, fields) => {
        !err ? res.json(rows) : res.json({ Status: err })
    })
}

export async function actualizarVacaciones(req, res) {
    const {_id} = req.params
    const {_fecha_salida, _fecha_entrada } = req.body
    const query = `
        SET @_id = ?;
        SET @_fecha_salida = ?;
        SET @_fecha_entrada = ?;
        CALL actualizarVacaciones(@_id, @_fecha_salida, @_fecha_entrada);
    `
    await mysqlConnection.query(query, [_id, _fecha_salida, _fecha_entrada], (err, rows, fields) => {
        !err ? res.json({ Status: "OK" }) : res.json({ Status: err })
    })
}

export async function eliminarVacaciones(req, res) {
    const { _id } = req.params
    const query = `
        SET @_id = ?;
        CALL eliminarVacaciones(@_id);
    `
    await mysqlConnection.query(query, [_id], (err, rows, fields) => {
        !err ? res.json({ Status: "OK" }) : res.json({ Status: err })
    })
}