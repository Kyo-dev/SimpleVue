import mysqlConnection from '../database.key'

export async function nuevasVacaciones(req, res) {
    const { _cedula, _fecha_salida, _fecha_entrada } = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha_salida = ?;
        SET @_fecha_entrada = ?;
        CALL nuevasVacaciones(@_cedula, @_fecha_salida , @_fecha_entrada);
    `
    await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_cedula], (err, rows, fields)=>{
        if(!err){
            if(rows.length > 0){
                mysqlConnection.query(query, [_cedula, _fecha_salida, _fecha_entrada], (err, rows, fields)=>{
                    if(!err){
                        res.json({Status: 'Nuevas vacaciones registradas'})
                    } else {
                        res.json({"Message": "Error en los datos"})        
                    }
                })
            } else{
                res.json({"Message": "Cedula invalida"})
            }
        } else {
            res.json({"Message": "Usuario no encontrado"})
        }
    })
}

export async function obtenerVacaciones(req, res) {
    const query = `
        select a.id, b.cedula, b.p_apellido, b.nombre, b.nombre, b.p_apellido,  substr(a.fecha_salida, 1, 10) as fecha_salida,  substr(a.fecha_entrada, 1, 10) as fecha_entrada from vacaciones a
        inner join empleados b on a.cedula_empleado = b.cedula where a.activo = true;
    `
    await mysqlConnection.query(query, (err, rows, fields) => {
        if (!err && JSON.stringify(rows).length > 0) {
            res.json(rows)
        } else {
            res.json({ "Message": err })
        }
    })
}

export async function obtenerVacacionesID(req, res) {
    const { _id } = req.params
    const query = `
    select a.id, b.cedula as cedula_empleado, b.nombre, b.p_apellido, substr(a.fecha_salida, 1, 10) as fecha_salida,   substr(a.fecha_entrada, 1, 10) as fecha_entrada from vacaciones a
    inner join empleados b on a.cedula_empleado = b.cedula where a.activo = true and a.id = ${_id};
    `
    await mysqlConnection.query(query, (err, rows, fields) => {
        if (!err && rows.length > 0) {
            res.json(rows[0])
        } else {
            console.log(err);
            res.json({ "Message": err })
        }
    })
}

export async function actualizarVacaciones(req, res) {
    const { _id } = req.params
    const {_cedula, _fecha_salida, _fecha_entrada } = req.body
    const query = `
        SET @_id = ?;
        SET @_cedula = ?;
        SET @_fecha_salida = ?;
        SET @_fecha_entrada = ?;
        CALL actualizarVacaciones(@_id, @_cedula, @_fecha_salida, @_fecha_entrada);
    `
    await mysqlConnection.query(query, [_id, _cedula, _fecha_salida, _fecha_entrada], (err, rows, fields) => {
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