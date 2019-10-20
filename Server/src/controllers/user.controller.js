import mysqlConnection from '../database.key'
import bcrypt from 'bcryptjs'
import config from '../config.key'
import jwt from 'jsonwebtoken'

//SECTION EMPLEADOS
export async function newEmployee(req, res) {
    const { _cedula, _nombre, _p_apellido, _s_apellido, _correo, _fecha_contrato, _tipo_empleado, _salario_hora } = req.body
    const query = `
        SET @_cedula = ?;
        SET @_nombre = ?;
        SET @_p_apellido = ?;
        SET @_s_apellido = ?;
        SET @_correo = ?;
        SET @_fecha_contrato = ?;
        SET @_tipo_empleado = ?;
        
        SET @_salario_hora = ?;
        CALL nuevoEmpleado(@_cedula, @_nombre,@_p_apellido,@_s_apellido, @_correo, @_fecha_contrato,@_tipo_empleado,  @_salario_hora);
    `
    await mysqlConnection.query('SELECT correo From empleados Where correo = ? OR cedula = ?', [_correo, _cedula], (err, rows, fields) => {
        if (!rows[0]) {
            mysqlConnection.query(query, [_cedula, _nombre, _p_apellido, _s_apellido, _correo, _fecha_contrato, _tipo_empleado, _salario_hora], (err, rows, fields) => {
                if (!err && rows.length > 0) {
                    res.json({ Status: 'Nuevo empleado registrado satisfactoriamente' })
                } else {
                    console.log(err);
                    res.json({ "Message": err })
                }
            })
        } else {
            console.log(err);
            res.json({ "Message": 'El usuario ya se encuentra registrado' })
        }
    })
}

export async function allEmployee(req, res) {
    await mysqlConnection.query(`SELECT a.cedula, a.nombre, a.p_apellido, a.s_apellido, a.correo, a.fecha_contrato, a.tipo_empleado, b.salario_hora 
                                FROM empleados a inner join salarios b on a.cedula = b.cedula_empleado where a.activo = true`, (err, rows, fields) => {
        if (!err && rows.length > 0) {
            res.json(rows)
        } else {
            console.log(err);
            res.json({ "Message": err })
        }
    })
}

export async function employeeDNI(req, res) {
    const { _cedula } = req.params
    await mysqlConnection.query('SELECT cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado FROM empleados WHERE cedula = ?', [_cedula], (err, rows, fields) => {
        if (!err && rows.length > 0) {
            res.json(rows[0])
        } else {
            console.log(err);
            res.json({ "Message": err })
        }
    })
}

export async function deleteEmployee(req, res) {
    const { _cedula } = req.params
    const query = `
        SET @_cedula = ?;
        CALL nuevoDespido(@_cedula);
    `
    await mysqlConnection.query(query, [_cedula], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0])
        } else {
            console.log(err);
            res.json({ "Message": err })
        }
    })
}
//!SECTION 

//SECTION ADM
export async function registerAdmin(req, res) {
    let {_correo, _clave, _fecha} = req.body
    const query = `
        SET @_correo = ?;
        SET @_clave = ?;
        SET @_fecha = ?;
        CALL nuevoAdm(@_correo, @_clave, @_fecha);
    `
    await mysqlConnection.query('SELECT correo FROM empleados WHERE correo = ?', [_correo], (err, rows, fields) => {
        if (!err) {
            console.log('ENTRA 1')
            bcrypt.hash(_clave, 10, (err, hash) => {
                console.log('entra 2 ')
                console.log(_clave)
                _clave = hash
                console.log(_clave)
                mysqlConnection.query(query, [_correo, _clave, _fecha], (err, rows, fields) => {
                    // console.log(rows)
                    if (!err) {
                        console.log('correct')
                        res.json({rows})
                    } else {
                        res.json({ "mensaje": "errors" })
                    }
                })
            })
        }else{
            res.json({ "mensaje": "error 2" })
        }
    })
}

export async function loginAdm(req, res) {
    const { _correo, _clave } = req.body
    await mysqlConnection.query('SELECT correo FROM empleados WHERE correo = ?', [_correo], (err, rows, fields) => {
        if (!err && rows.length > 0) {
            console.log(rows)
            console.log('MENSAJE 01')
            mysqlConnection.query('SELECT a.clave FROM adm a inner join empleados b on a.correo = b.correo where a.correo = ?', [_correo], (err, rows, fields) => {
                if (!err && rows.length > 0) {
                    console.log('CLAVE DE ROWS')
                    const data = JSON.stringify(rows[0])
                    const clave = data.substring(10, data.length - 2)
                    console.log(clave)
                    console.log('MENSAJE 03')
                    bcrypt.compare(_clave, clave, (err, result) => {
                        if (err) res.status(401).json({ message: "error" })
                        if (result) {
                            console.log('MENSAJE 04')
                            const token = jwt.sign({
                                email: _correo,
                                
                            },
                                process.env.SECRET_KEY = config.secret,
                                {
                                    expiresIn: "1h"
                                })
                            return res.status(200).json({
                                Auth: true,
                                result: result,
                                token: token,
                                message: 'Auth successful',
                            })
                        } else {
                            res.status(401).json({ message: 'Auth faild 3' })
                        }
                    })
                } else {
                    res.status(401).json({ "message:": "Error 05" })
                    console.log('ERROR 05')
                }

            })

        } else {
            res.status(401).json({ "message:": "Error 02" })
            console.log("Error 02")
        }

    })

}

//!SECTION 

    // "_correo": "Charlotte@icloud.com",
    // "_clave": "charlotte"