import mysqlConnection from '../database.key'

export async function newEmployee(req, res) {
    const { _cedula, _nombre, _p_apellido, _s_apellido, _correo, _fecha_contrato, _tipo_empleado, _planilla, _salario_hora } = req.body
    const query = `
        SET @_cedula = ?;
        SET @_nombre = ?;
        SET @_p_apellido = ?;
        SET @_s_apellido = ?;
        SET @_correo = ?;
        SET @_fecha_contrato = ?;
        SET @_tipo_empleado = ?;
        SET @_planilla = ?;
        SET @_salario_hora = ?;
        CALL nuevoEmpleado(@_cedula, @_nombre,@_p_apellido,@_s_apellido, @_correo, @_fecha_contrato,@_tipo_empleado, @_planilla, @_salario_hora);
    `
    await mysqlConnection.query('SELECT correo From empleados Where correo = ? OR cedula = ?', [_correo, _cedula], (err, rows, fields)=>{
        if(!rows[0]){
            mysqlConnection.query(query, [_cedula, _nombre, _p_apellido, _s_apellido, _correo, _fecha_contrato, _tipo_empleado, _planilla, _salario_hora], (err, rows, fields) =>{
                if(!err){
                    res.json({Status: 'Nuevo empleado registrado satisfactoriamente'})
                }else {
                    console.log(err);
                    res.json({"Message": '01'})
                }
            })
        }else{
            console.log(err);
            res.json({"Message": '02'})
        }
    })
}

export async function allEmployee(req, res){
    await mysqlConnection.query('SELECT cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado FROM empleados', (err, rows, fields) =>{
        if(!err){
            res.json(rows)
        } else {
            console.log(err);
            res.json({"Message": err})
        }
    })
}

export async function employeeDNI(req, res){
    const {cedula} = req.params
    await mysqlConnection.query('SELECT cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado FROM empleados WHERE cedula = ?', [cedula], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0])
        } else{
            console.log(err)
        }
    })
}

