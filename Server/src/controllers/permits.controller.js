import mysqlConnection from '../database.key'
import config from '../config.key'

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
                console.log("mensaje 01")
                mysqlConnection.query(query, [_cedula, _fecha, _descripcion, _costoSalarial], (err, rows, fields)=>{
                    if(!err){
                        res.json({Status: 'Nuevo permiso registrado'})
                    } else {
                        console.log("Error en los datos")
                        res.json({"Message": err})        
                    }
                })
            } else{
                console.log("Cedula invalida")
                res.json({"Message": err})
            }
        } else {
            console.log(err)
            res.json({"Message": err})
        }
    })
}

export async function todosPermisos(req, res){
    await mysqlConnection.query(`Select a.id, a.cedula_empleado, b.nombre, b.p_apellido, a.descripcion, a.costo_salarial, a.fecha from permisos a
    inner join empleados b on a.cedula_empleado = b.cedula where a.activo = true`, (err, rows, fields)=>{
        if (!err && rows.length > 0) {
            res.json(rows)
        } else {
            console.log(err);
            res.json({ "Message": err })
        }
    })  
}
export async function permisoDNI(req, res){
    const {_dni} = req.params
    await mysqlConnection.query(`Select a.id, a.cedula_empleado, b.nombre, b.p_apellido, a.descripcion, a.costo_salarial, a.fecha from permisos a
                                inner join empleados b on a.cedula_empleado = b.cedula where activo = true and cedula = ?`, [_dni], (err, rows, fields)=>{
        if (!err && rows.length > 0) {
            res.json(rows)
        } else {
            console.log(err);
            res.json({ "Message": err })
        }
    })
}
export async function borrarPermiso(req, res){
    const {_id} = req.body
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
    const {_date, _description, _cost} = req.body
    const query = `
        SET @_id = ?;
        SET @_date = ?;
        SET @_description = ?;
        SET @_cost = ?;
        CALL actualizarPermiso (@_id, @_date, @_description, @_cost)
    `
    await mysqlConnection.query(query, [_id, _date, _description, _cost], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0])
            console.log('Permiso actualizado')
        } else {
            console.log("No se pudo actualizar el permiso")
            res.json({"Message": err})        
        }
    })
}