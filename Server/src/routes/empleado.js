import {Router} from 'express'
const router = Router()
import { nuevoEmpleado, todosEmpleados } from '../controllers/empleado.controller'
router.get('/', todosEmpleados)
router.post('/', nuevoEmpleado )

export default router