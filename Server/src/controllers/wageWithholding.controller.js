import mysqlConnection from '../database.key'

export async function nuevaRetencion(req, res){
    const { _cedula, _fecha, _retencion , _descripcion} = req.body
    const query = `
        SET @_cedula = ?;
        SET @_fecha = ?;
        SET @_retencion = ?;
        SET @_descripcion = ?;
        CALL nuevoRetencion(@_cedula, @_fecha, @_retencion, @_descripcion)
    `
    await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_cedula], (err, rows,fields)=>{
        if(!err){
            if(rows.length > 0){
                mysqlConnection.query(query, [_cedula, _fecha, _retencion, _descripcion], (err, rows, fields)=>{
                    if(!err){
                        res.json({Status: "Nueva retencion registrada"})
                    }else{
                        res.json({Status: "Error en los datos"})
                    }                 
                })
            } else {
                res.json({"Message": "Cedula invalida"})
            }
        } else {
            res.json({status: 404})
        }
    })
}

export async function obtenerRetenciones(req, res){
    await mysqlConnection.query(`kjljkl`, (err, rows, fields)=>{
        if(!err && JSON.stringify(rows).length > 0){
            res.json(rows)
        } else {
            res.json({"Message": err})
        }
    })
}