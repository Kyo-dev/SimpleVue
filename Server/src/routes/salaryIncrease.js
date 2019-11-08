import {Router} from 'express'
import { nuevoAumento, todosAumentos, aumentoID,borrarAumento } from '../controllers/salaryIncrease.controller'
const router = Router()

router.post('/salarios', nuevoAumento)
router.get('/salarios', todosAumentos)
router.get('/salarios/:_id', aumentoID)
router.put('/salarios/:_id', borrarAumento)
export default router