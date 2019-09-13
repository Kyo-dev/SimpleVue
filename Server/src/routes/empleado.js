import {Router} from 'express'
const router = Router()
import { nuevoEmpleado } from '../controllers/empleado.controller'
router.post('/', nuevoEmpleado )

export default router