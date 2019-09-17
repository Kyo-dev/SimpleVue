import mysqlConnection from '../database.key'
import bcrypt from 'bcryptjs'
import config from '../config.key'
import jwt from 'jsonwebtoken'

//SECTION EMPLEADOS
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
                    res.json({"Message": err})
                }
            })
        }else{
            console.log(err);
            res.json({"Message": 'El usuario ya se encuentra registrado'})
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
    const {_cedula} = req.params
    await mysqlConnection.query('SELECT cedula, nombre, p_apellido, s_apellido, correo, fecha_contrato, tipo_empleado FROM empleados WHERE cedula = ?', [_cedula], (err, rows, fields) =>{
        if(!err){
            res.json(rows[0])
        } else{
            console.log(err)
        }
    })
}
//!SECTION 

//SECTION ADM
export async function registerAdmin(req, res) {
    const _cedula = req.body._cedula
    let _clave = req.body._clave
    await mysqlConnection.query('SELECT cedula FROM empleados WHERE cedula = ?', [_cedula], (err, rows, fields) => {
        if (rows[0]) {
            bcrypt.hash(_clave, 10, (err, hash)=> {
                _clave = hash
                mysqlConnection.query('INSERT INTO adm(cedula, clave) values (?, ?)', [_cedula, _clave], (err, rows, fields) => {
                    if (!err) {
                        res.json({"mensaje":"correcto"})
                    } else {
                        res.json({"mensaje":"error"})
                    }
                })
            })
        }
    }) 
}

export async function loginAdm(req, res) {
    const { _correo, _clave, _cedula } = req.body
    console.log(req.body._clave)
    await mysqlConnection.query('SELECT correo FROM empleados WHERE correo = ?', [_correo], (err, rows, fields) => {
        console.log('MENSAJE 01')
        if (!err) {
            console.log('MENSAJE 02')
            mysqlConnection.query('SELECT a.clave FROM adm a inner join empleados b on a.cedula = b.cedula where a.cedula = ?', [_cedula], (err, rows, fields) => {
                console.log('Clave encriptada: ')
                let data = JSON.stringify(rows[0])
                let clave = data.substring(10,data.length-2)
                console.log('ESTA ES LA CLAVE' + clave)
                console.log(clave)
                if (!err) {
                    console.log('MENSAJE 03')
                    bcrypt.compare(_clave, clave, (err, result) => {
                        if (err) res.status(401).json({message: "error"})
                        if (result){
                            console.log('MENSAJE 04')
                            const token = jwt.sign({
                                email: _correo,
                                userID: _cedula
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
                }
            })

        } else {
            res.status(401).json({ "message:": "Error 02" })
        }
    })

}

//!SECTION 