import mysqlConnection from '../database.key'

export async function nuevoAumento(req, res) {
    const { _cedula, _fecha, _cantidad } = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_cantidad = ?;
        CALL nuevoAumento(@_cedula, @_fecha, @_cantidad);
        `
        await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_cedula], (err, rows, fields)=>{
            if(!err){
                if(rows.length > 0){
                    mysqlConnection.query(query, [_cedula, _fecha, _cantidad], (err, rows, fields)=>{
                        if(!err){
                            res.json({Status: 'Nuevo aumento registrado'})
                        } else {
                            res.json({"Message": "Error en los datos"})        
                        }
                    })
                } else{
                    res.json({"Message": "Cedula invalida"})
                }
            } else {
                res.json({Status: 404})
            }
        })
    }

export async function todosAumentos(req, res) {
    await mysqlConnection.query(`select distinct a.cedula, b.p_apellido, b.nombre, (c.salario_hora * c.jornada) as salario_dia, a.cantidad, substr(a.fecha, 1, 10) as fecha, b.activo , a.id from aumento_salarial a
    inner join empleados b on a.cedula = b.cedula
    inner join salarios c on c.cedula = b.cedula where a.activo = true`, (err, rows, fields) => {
        if (!err && JSON.stringify(rows).length > 0) {
            res.json(rows)
        } else {
            res.json({ "Message": err })
        }
    })
}

export async function aumentoID(req, res) {
    const { _id } = req.params
    await mysqlConnection.query(`select a.id, a.cedula, c.salario_hora, a.cantidad, substr(a.fecha, 1, 10) as fecha, b.nombre, b.p_apellido, b.activo from aumento_salarial a
    inner join empleados b on a.cedula = b.cedula
    inner join salarios c on c.cedula = b.cedula where a.activo = true and a.id = ?`, [_id], (err, rows, fields) => {
        !err ? res.json(rows[0]) : res.json({ Status: err })
    })
}

export async function borrarAumento(req, res) {
    const {_id} = req.params
    const {_cedula} = req.body
    const query = `
        SET @_id = ?;
        SET @_cedula = ?;
        CALL eliminarAumento(@_id, @_cedula)
    `
    await mysqlConnection.query(query, [_id, _cedula], (err, rows, fields) => {
        !err ? res.json(rows[0]) : res.json({ Status: err })
    })
}