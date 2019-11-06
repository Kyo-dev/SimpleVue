import mysqlConnection from '../database.key'

export async function nuevoAumento(req, res) {
    const { _cedula, _fecha, _aumento_salarial } = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_aumento_salarial = ?;
        CALL nuevoAumento(@_cedula, @_fecha, @_aumento_salarial)
    `
    await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_cedula], (err, rows, fields) => {
        if (!err) {
            mysqlConnection.query(query, [_cedula, _fecha, _aumento_salarial], (err, rows, fields) => {
                !err ? res.json({ Status: "OK" }) : res.json({ Status: err })
            })
        } else {
            console.log('Error en la cedula')
            res.json({ Status: err })
        }
    })
}

export async function todosAumentos(req, res) {
    await mysqlConnection.query(`select a.id, a.cedula_empleado, c.salario_hora, a.cantidad, a.fecha, b.nombre, b.p_apellido, b.activo from aumento_salarial a
    inner join empleados b on a.cedula_empleado = b.cedula
    inner join salarios c on c.cedula_empleado = b.cedula where a.activo = true`, (err, rows, fields) => {
        if (!err && JSON.stringify(rows).length > 0) {
            res.json(rows)
        } else {
            res.json({ "Message": err })
        }
    })
}

export async function aumentoCedula(req, res) {
    const { _cedula } = req.params
    await mysqlConnection.query(`select a.id, a.cedula_empleado, c.salario_hora, a.cantidad, a.fecha, b.nombre, b.p_apellido, b.activo from aumento_salarial a
    inner join empleados b on a.cedula_empleado = b.cedula
    inner join salarios c on c.cedula_empleado = b.cedula where a.activo = true and a.cedula_empleado = ?`, [_cedula], (err, rows, fields) => {
        !err ? res.json(rows) : res.json({ Status: err })
    })
}

export async function borrarAumento(req, res) {
    const { _id, _cedula } = req.body
    const query = `
        SET @_id = ?;
        SET @_cedula = ?;
        CALL eliminarAumento(@_id, @_cedula)
    `
    await mysqlConnection.query(query, [_id, _cedula], (err, rows, fields) => {
        !err ? res.json({ Status: "OK" }) : res.json({ Status: err })
    })
}