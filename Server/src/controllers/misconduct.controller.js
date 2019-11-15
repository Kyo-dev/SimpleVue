import mysqlConnection from '../database.key'

export async function nuevaDisciplina(req, res){
    const {_cedula, _fecha, _descripcion} = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_descripcion = ?;
        CALL nuevoRegistroDisciplinario(@_cedula, @_fecha, @_descripcion);
        `
        await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_cedula], (err, rows, fields)=>{
            if(!err){
                if(rows.length > 0){
                    mysqlConnection.query(query, [_cedula, _fecha, _descripcion], (err, rows, fields)=>{
                    if(!err){
                        res.json({Status: 'Nuevo registro disciplinario'})
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


export async function todasDisciplinas(req, res) {
    await mysqlConnection.query(`Select a.id, a.cedula_empleado, b.nombre, b.p_apellido, a.descripcion, substr(a.fecha, 1, 10) as fecha  from registro_disciplinario a
    inner join empleados b on a.cedula_empleado = b.cedula and a.activo = true`, (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({"Message": err})
    }) 
}

export async function disciplinaID(req, res) {
    const {_id} = req.params
    await mysqlConnection.query(`Select a.id, a.cedula_empleado, b.nombre, b.p_apellido, a.descripcion, substr(a.fecha, 1, 10) as fecha  from registro_disciplinario a
    inner join empleados b on a.cedula_empleado = b.cedula where a.id = ? and a.activo = true`, [_id],(err, rows, fields)=>{
        if (!err && rows.length > 0) {
            res.json(rows[0])
        } else {
            console.log(err);
            res.json({ "Message": err })
        }
    })
}

export async function actualizarDisciplina(req, res){
    const {_id} = req.params
    const {_cedula, _fecha, _descripcion} = req.body
    const query = `
        SET @_id = ?;
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_descripcion = ?;
        CALL actualizarRegistroDisciplinario(@_id, @_cedula, @_fecha, @_descripcion);
    `
    await mysqlConnection.query(query, [_id, _cedula, _fecha, _descripcion], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({"Message": err})
    })
}

export async function borrarDisciplina(req, res){
    const {_id} = req.params
    const query = `
        SET @_id = ?;
        CALL eliminarRegistroDisciplinario(@_id);
    `
    await mysqlConnection.query(query, [_id], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({"Message": err})
    })
}