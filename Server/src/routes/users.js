import {Router} from 'express'
const router = Router()
import { allEmployee, employeeDNI, newEmployee , registerAdmin, loginAdm, deleteEmployee } from '../controllers/user.controller'

router.post('/empleados', newEmployee)
router.get('/empleados', allEmployee)
router.get('/empleados/:_cedula', employeeDNI)
router.delete('/empleados/:_cedula', deleteEmployee)

router.post('/nuevo-adm', registerAdmin)
router.post('/login',loginAdm )
export default router

// "_correo:":"tina@gmail.com",
// "_clave": "asdfis1234ka",
// "_cedula":"102220222"