import {Router} from 'express'
const router = Router()
import { nuevoEmpleado, todosEmpleados, empleadoDNI } from '../controllers/empleado.controller'
router.get('/', todosEmpleados)
router.get('/:cedula', empleadoDNI)
router.post('/', nuevoEmpleado)

export default router