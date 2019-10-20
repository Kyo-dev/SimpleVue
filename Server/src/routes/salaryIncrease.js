import {Router} from 'express'
import { nuevoAumento, todosAumentos, aumentoDNI } from '../controllers/salaryIncrease.controller'
const router = Router()

router.post('/aumento-salarial', nuevoAumento)
router.get('/aumento-salarial', todosAumentos)
router.get('/aumento-salarial/:_dni', aumentoDNI)
export default router