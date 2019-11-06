import mysqlConnection from '../database.key'

export async function nuevoBono(req, res) {
    const { _cedula, _motivo, _cantidad, _fecha } = req.body
    const query = `
        SET @_cedula = ?;
        SET @_motivo = ?;
        SET @_cantidad = ?;
        SET @_fecha = ?;
        CALL nuevoBono(@_cedula, @_motivo, @_cantidad, @_fecha) 
    `
    await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_cedula], (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                console.log('entra')
                mysqlConnection.query(query, [_cedula, _motivo, _cantidad, _fecha], (err, rows, fields) => {
                    if (!err) {
                        res.json({ Status: 'Nuevo bono registrado' })
                    } else {
                        console.log("Error en los datos")
                        res.json({ "Message": err })
                    }
                })
            } else {
                console.log("Cedula invalida")
                res.json({ "Message": err })
            }

        } else {
            console.log("Cedula invalida")
            res.json({ "Message": err })
        }
    })
}

export async function todosBonos(req, res) {
    await mysqlConnection.query(`select a.id, a.cedula_empleado, a.motivo, a.cantidad, substr(a.fecha, 1, 10) as fecha, b.nombre, b.p_apellido, b.activo from bonos a
    inner join empleados b on a.cedula_empleado = b.cedula and a.activo = true;`, (err, rows, fields) => {
        if (!err && JSON.stringify(rows).length > 0) {
            res.json(rows)
        } else {
            res.json({ "Message": err })
        }
    })
}

export async function bonoID(req, res) {
    const { _id } = req.params
    await mysqlConnection.query(`select a.id, a.cedula_empleado, a.motivo, a.cantidad, substr(a.fecha, 1, 10) as fecha, b.nombre, b.p_apellido from bonos a
    inner join empleados b on a.cedula_empleado = b.cedula where b.activo = true and a.id = ?`, [_id], (err, rows, fields) => {
        !err ? res.json(rows[0]) : res.json({ "Message": err })
    })
}

export async function actualizarBono(req, res) {
    const { _id } = req.params
    const { _motivo, _cantidad, _fecha } = req.body
    const query = `
        SET @_id = ?;
        SET @_motivo = ?;
        SET @_cantidad = ?;
        SET @_fecha = ?;
        CALL actualizarBono(@_id, @_motivo, @_cantidad, @_fecha)
    `
    await mysqlConnection.query(query, [_id, _motivo, _cantidad, _fecha], (err, rows, fields) => {
        !err ? res.json(rows[0]) : res.json({ "Message": err })
    })
}

export async function borrarBono(req, res) {
    const { _id } = req.params
    const query = `
        SET @_id = ?;
        CALL eliminarBono(@_id);
    `
    await mysqlConnection.query(query, [_id], (err, rows, fields) => {
        !err ? res.json({ Status: "OK" }) : res.json({ "Message": err })
    })
}