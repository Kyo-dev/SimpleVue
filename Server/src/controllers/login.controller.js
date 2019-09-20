import mysqlConnection from '../database.key'
import bcrypt from 'bcryptjs'
import config from '../config.key'
import jwt from 'jsonwebtoken'

export async function login(req, res) {
    const { _correo, _clave, _cedula } = req.body
    console.log(req.body._clave)
    if (_correo.length <= 0) {
        res.status(401).json({ "message:": "Por favor ingrese su correo" })
    }
    await mysqlConnection.query('SELECT correo FROM empleados WHERE correo = ?', [_correo], (err, rows, fields) => {
        if (!err) {
            mysqlConnection.query('SELECT a.clave FROM adm a inner join empleados b on a.cedula = b.cedula where a.cedula = ?', [_cedula], (err, rows, fields) => {
                console.log(rows[0])
                if (!err) {
                    console.log('si entra')
                    bcrypt.compare(_clave, rows[0], (err, result) => {
                        if (!err) {
                            console.log('si entra2')
                            const token = jwt.sign({
                                email: _correo,
                                userID: _cedula
                            },
                                process.env.SECRET_KEY = config.secret,
                                {
                                    expiresIn: '1m' 
                                    
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
                    res.status(401).json({ "message:": "Error 01" })
                }
            })

        } else {
            res.status(401).json({ "message:": "Error 02" })
        }
    })
}