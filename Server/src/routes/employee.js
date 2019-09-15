import {Router} from 'express'
const router = Router()
import { allEmployee, employeeDNI, newEmployee } from '../controllers/employee.controller'
router.post('/', newEmployee)
router.get('/', allEmployee)
router.get('/:cedula', employeeDNI)

export default router