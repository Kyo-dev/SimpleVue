import {Router} from 'express'
import { nuevoAumento, todosAumentos, aumentoDNI,borrarAumento } from '../controllers/salaryIncrease.controller'
const router = Router()

router.post('/aumento-salarial', nuevoAumento)
router.get('/aumento-salarial', todosAumentos)
router.get('/aumento-salarial/:_dni', aumentoDNI)
router.delete('/aumento-salarial', borrarAumento)
export default router