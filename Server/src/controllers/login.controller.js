import mysqlConnection from '../database.key'
import bcryptjs from 'bcryptjs'

export async function login(req, res){
    const {email, pass} = req.body
    
}