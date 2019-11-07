import {Router} from 'express'
import { nuevoAumento, todosAumentos, aumentoCedula,borrarAumento } from '../controllers/salaryIncrease.controller'
const router = Router()

router.post('/salarios', nuevoAumento)
router.get('/salarios', todosAumentos)
router.get('/salarios/:_cedula', aumentoCedula)
router.delete('/salarios', borrarAumento)
export default router