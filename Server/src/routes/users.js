import {Router} from 'express'
const router = Router()
import { todosEmpleados, empleadoDNI, nuevoEmpleado , crearAdm, loginAdm, nuevoDespido } from '../controllers/user.controller'

router.post('/empleados', nuevoEmpleado)
router.get('/empleados', todosEmpleados)
router.get('/empleados/:_cedula', empleadoDNI)
router.delete('/empleados', nuevoDespido)

router.post('/nuevo-adm', crearAdm)
router.post('/login',loginAdm )
export default router
