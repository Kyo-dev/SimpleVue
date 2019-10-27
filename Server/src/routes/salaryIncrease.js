import {Router} from 'express'
import { nuevoAumento, todosAumentos, aumentoCedula,borrarAumento } from '../controllers/salaryIncrease.controller'
const router = Router()

router.post('/aumento-salarial', nuevoAumento)
router.get('/aumento-salarial', todosAumentos)
router.get('/aumento-salarial/:_cedula', aumentoCedula)
router.delete('/aumento-salarial', borrarAumento)
export default router