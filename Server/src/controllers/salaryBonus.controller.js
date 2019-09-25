import mysqlConnection from '../database.key'
import config from '../config.key'

export async function newBonus(req, res){
    const{_dni, _description, _amount, _date} = req.body
    const query = `
        SET @_cedula = ?;
        SET @_motivo = ?;
        SET @_cantidad = ?;
        SET @_fecha = ?;
        CALL nuevoBono(@_cedula, @_motivo, @_cantidad, @_fecha) 
    `
    await mysqlConnection.query('Select cedula from empleados where cedula = ? and activo = true', [_dni], (err, rows, fields) =>{
        if(!err){
            if(rows.length > 0){
                console.log('entra')
                mysqlConnection.query(query, [_dni, _description, _amount, _date], (err, rows, fields) =>{
                    if(!err){
                        res.json({Status: 'Nuevo bono registrado'})
                    }else{
                        console.log("Error en los datos")
                        res.json({"Message": err})
                    }
                })
            }else{
               console.log("Cedula invalida")
               res.json({"Message": err}) 
            }
            
        }else{
            console.log("Cedula invalida")
            res.json({"Message": err})
        }
    })
}

export async function allBonus(req, res){
    await mysqlConnection.query(`select a.id, a.cedula_empleado, a.motivo, a.cantidad, a.fecha, b.nombre, b.p_apellido, b.activo from bonos a
    inner join empleados b on a.cedula_empleado = b.cedula`, (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({"Message": err})
    })
}

export async function bonusDNI(req, res){
    const {_dni} = req.params
    await mysqlConnection.query(`select a.cedula_empleado, a.motivo, a.cantidad, a.fecha, b.nombre, b.p_apellido from bonos a
    inner join empleados b on a.cedula_empleado = b.cedula where b.activo = true and cedula = ?`, [_dni], (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({"Message": err})
    })
}

export async function updateBonoID(req, res){
    const {_id} = req.params
    const {_description, _amount, _date} = req.body
    const query = `
        SET @_id = ?;
        SET @_motivo = ?;
        SET @_cantidad = ?;
        SET @_fecha = ?;
        CALL actualizarBono(@_id, @_motivo, @_cantidad, @_fecha)
    `
    await mysqlConnection.query(query, [_id, _description, _amount, _date], (err, rows, fields)=>{
        !err ? res.json(rows) : res.json({"Message": err})
    })
}

export async function deleteBonusID(req, res){
    const {_id} = req.params
    await mysqlConnection.query('delete from bonos where id = ?', [_id], (err, rows, fields)=>{
        !err ? res.json({Status: "OK"}) : res.json({"Message": err})
    })
}