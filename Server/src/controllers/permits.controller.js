import mysqlConnection from '../database.key'

export async function nuevoPermiso(req, res){
    const {_cedula, _fecha, _descripcion, _costoSalarial} = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_descripcion = ?;
        SET @_costoSalarial = ?;
        CALL nuevoPermiso (@_cedula, @_fecha ,@_descripcion, @_costoSalarial)
    `
    await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_cedula], (err, rows, fields)=>{
        if(!err){
            if(rows.length > 0){
                mysqlConnection.query(query, [_cedula, _fecha, _descripcion, _costoSalarial], (err, rows, fields)=>{
                    if(!err){
                        res.json({Status: 'Nuevo permiso registrado'})
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

export async function todosPermisos(req, res){
    await mysqlConnection.query(`Select a.id, a.cedula_empleado, b.nombre, b.p_apellido, a.descripcion, a.costo_salarial, substr(a.fecha, 1, 10) as fecha from permisos a
    inner join empleados b on a.cedula_empleado = b.cedula where a.activo = true`, (err, rows, fields)=>{
        if (!err  && JSON.stringify(rows).length > 0 ) {
                res.json(rows)
        } else {
            res.json({ "Message": err })
        }
    })  
}
export async function permisoID(req, res){
    const {_id} = req.params
    await mysqlConnection.query(`Select a.id, a.cedula_empleado, b.nombre, b.p_apellido, a.descripcion, a.costo_salarial, substr(a.fecha, 1, 10) as fecha from permisos a
                                inner join empleados b on a.cedula_empleado = b.cedula where a.activo = true and a.id = ?`, [_id], (err, rows, fields)=>{
        if (!err && rows.length > 0) {
            res.json(rows[0])
        } else {
            console.log(err);
            res.json({ "Message": err })
        }
    })
}
export async function borrarPermiso(req, res){
    const {_id} = req.params
    const query = `
        SET @_id = ?;
        CALL eliminarPermiso(@_id)
    `
    await mysqlConnection.query(query, [_id], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({"Message": err})
    })
}

export async function actualizarPermiso(req, res){
    const {_id} = req.params
    const {_fecha, _descripcion, _costoSalarial} = req.body
    const query = `
        SET @_id = ?;
        SET @_fecha = ?;
        SET @_descripcion = ?;
        SET @_costoSalarial = ?;
        CALL actualizarPermiso (@_id, @_fecha, @_descripcion, @_costoSalarial)
    `
    await mysqlConnection.query(query, [_id, _fecha, _descripcion, _costoSalarial], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0])
            console.log('Permiso actualizado')
        } else {
            console.log("No se pudo actualizar el permiso")
            console.log(JSON.stringify(rows[0]))
            res.json({"Message": err})        
        }
    })
}