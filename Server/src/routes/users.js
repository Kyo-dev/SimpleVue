import {Router} from 'express'
const router = Router()
import { allEmployee, employeeDNI, newEmployee , registerAdmin, loginAdm } from '../controllers/user.controller'

router.post('/empleados', newEmployee)
router.get('/empleados', allEmployee)
router.get('/empleados/:_cedula', employeeDNI)

router.post('/nuevo-adm', registerAdmin)
router.post('/login',loginAdm )
export default router