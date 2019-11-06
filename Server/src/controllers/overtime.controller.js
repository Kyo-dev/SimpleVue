import mysqlConnection from '../database.key'

export async function nuevaHorasExtra(req, res) {
    const { _cedula, _cantidad_horas, _motivo, _fecha } = req.body
    const query = `
        SET @_cedula = ?;
        SET @_cantidad_horas = ?;
        SET @_motivo = ?;
        SET @_fecha =?;
        CALL nuevaHoraExtra(@_cedula, @_cantidad_horas, @_motivo, @_fecha);
    `
    await mysqlConnection.query('SELECT cedula FROM empleados WHERE cedula = ?', [_cedula], (err, rows, fields) => {
        if (!err && rows.length > 0) {
            mysqlConnection.query(query, [_cedula, _cantidad_horas, _motivo, _fecha], (err, rows, fields) => {
                !err ? res.json({ Status: "OK" }) : res.json({ "Message": err })
            })
        } else {
            res.json({ "Message": err })
        }
    })
}
export async function horasExtraEmpleado(req, res) {
    const { _cedula } = req.params
    const query = `
        SELECT a.id, a.cedula_empleado, b.p_apellido, b.nombre, a.cantidad_horas, a.motivo, a.fecha 
        FROM horas_extra a
        INNER JOIN empleados b
        ON a.cedula_empleado = b.cedula
        WHERE a.activo = true and
        a.cedula_empleado = ${_cedula};
    `
    await mysqlConnection.query('SELECT cedula FROM empleados WHERE cedula = ?', [_cedula], (err, rows, fields) => {
        if (!err && rows.length > 0) {
            mysqlConnection.query(query, [_cedula], (err, rows, fields) => {
                !err ? res.json(rows) : res.json({ "Message": err })
            })
        } else {
            res.json({ "Message": err })
        }
    })
}
export async function todasHorasExtra(req, res) {
    const query = `
        SELECT a.id, a.cedula_empleado, b.p_apellido, b.nombre, a.cantidad_horas, a.motivo, a.fecha 
        FROM horas_extra a
        INNER JOIN empleados b
        ON a.cedula_empleado = b.cedula
        WHERE a.activo = true;
    `
    await mysqlConnection.query(query, (err, rows, fields) => {
        if (!err && JSON.stringify(rows).length > 0) {
            res.json(rows)
        } else {
            res.json({ "Message": err })
        }
    })
}

export async function actualizarHorasExtra(req, res) {
    const { _id } = req.params
    let { _cedula, _cantidad_horas, _motivo, _fecha } = req.body
    const query = `
        SET @_id = ?;
        SET @_cedula = ?;
        SET @_cantidad_horas = ?;
        SET @_motivo = ?;
        SET @_fecha = ?;
        CALL actualizarHorasExtra(@_id, @_cedula, @_cantidad_horas, @_motivo, @_fecha);
    `
    await mysqlConnection.query('SELECT id FROM horas_extra WHERE id = ? AND activo = true', [_id], (err, rows, fields) => {
        console.log('01')
        if (!err && rows.length > 0) {
            console.log('02')
            mysqlConnection.query(query, [_id, _cedula, _cantidad_horas, _motivo, _fecha], (err, rows, fields) => {
                console.log('03')
                !err ? res.json({ Status: "OK" }) : res.json({ "Message": err })
            })
        } else {
            res.json({ "Message": err })
        }
    })
}
export async function borrarHorasExtra(req, res) {
    const { _id } = req.params
    const query = `
        SET @_id = ?;
        CALL eliminarHoraExtra(@_id);
    `
    await mysqlConnection.query('SELECT id FROM horas_extra WHERE id = ? AND activo = true', [_id], (err, rows, fields) => {
        if (!err && rows.length > 0) {
            mysqlConnection.query(query, [_id], (err, rows, fields) => {
                !err ? res.json({ Status: "OK" }) : res.json({ "Message": err })
            })
        } else {
            res.json({ "Message": err })
        }
    })
}