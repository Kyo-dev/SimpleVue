import {Router} from 'express'
import { newSalaryIncrease, allSalaryIncrease, salaryIncreaseDNI } from '../controllers/salaryIncrease.controller'
const router = Router()

router.post('/aumento-salarial', newSalaryIncrease)
router.get('/aumento-salarial', allSalaryIncrease)
router.get('/aumento-salarial/:_dni', salaryIncreaseDNI)
export default router