import mysqlConnection from '../database.key'

export async function nuevaDisciplina(req, res){
    const {_dni, _date, _description} = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_descripcion = ?;
        CALL nuevoRegistroDisciplinario(@_cedula, @_fecha, @_descripcion);
    `
    await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_dni], (err, rows, fields)=>{
        if(!err){
            mysqlConnection.query(query, [_dni, _date, _description], (err, rows, fields)=>{
                !err ? res.json({Status: "OK"}) : res.json({"Message": err})
            })
        }else{
            console.log('Problema con la cedula')
            res.json({Status: err})
        }
    })
}

export async function todasDisciplinas(req, res) {
    await mysqlConnection.query(`Select a.id, a.cedula_empleado, b.nombre, b.p_apellido, a.descripcion, a.fecha from registro_disciplinario a
    inner join empleados b on a.cedula_empleado = b.cedula and a.activo = true`, (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({"Message": err})
    }) 
}

export async function disciplinaID(req, res) {
    const {_id} = req.params
    await mysqlConnection.query(`Select a.id, a.cedula_empleado, b.nombre, b.p_apellido, a.descripcion, a.fecha from registro_disciplinario a
    inner join empleados b on a.cedula_empleado = b.cedula where a.id = ?`, [_id],(err, rows, fields)=>{
        !err ? res.json(rows) : res.json({"Message": err})
    })
}

export async function actualizarDisciplina(req, res){
    const {_id} = req.params
    const {_dni, _date, _description} = req.body
    const query = `
        SET @_id = ?;
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_descripcion = ?;
        CALL actualizarRegistroDisciplinario(@_id, @_cedula, @_fecha, @_descripcion);
    `
    await mysqlConnection.query(query, [_id, _dni, _date, _description], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({"Message": err})
    })
}

export async function borrarDisciplina(req, res){
    const {_id} = req.body
    const query = `
        SET @_id = ?;
        CALL eliminarRegistroDisciplinario(@_id);
    `
    await mysqlConnection.query(query, [_id], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({"Message": err})
    })
}