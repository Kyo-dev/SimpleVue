import {Router} from 'express'
import {nominaEmpleado} from '../controllers/payroll.controller'
const router = Router()
router.post('/planilla', nominaEmpleado)
export default router