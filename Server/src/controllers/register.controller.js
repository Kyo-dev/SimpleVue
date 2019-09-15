import mysqlConnection from '../database.key'
import config from '../config.key'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Router } from 'express'
const router = Router()

export async function registerAdmin(req, res) {
    const dni = req.body.dni
    let pass = req.body.pass
    await mysqlConnection.query('SELECT cedula FROM empleados WHERE cedula = ?', [dni], (err, rows, fields) => {
        if (rows[0]) {
            bcrypt.hash(pass, 10, (err, hash)=> {
                pass = hash
                mysqlConnection.query('INSERT INTO adm(cedula, clave) values (?, ?)', [dni, pass], (err, rows, fields) => {
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

export default router