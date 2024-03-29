import {Router} from 'express'
const router = Router()
import { nuevoBono, todosBonos, bonoID, borrarBono, actualizarBono } from '../controllers/salaryBonus.controller'

router.post('/bonos', nuevoBono)
router.get('/bonos', todosBonos)
router.get('/bonos/:_id', bonoID)
router.put('/bonos/:_id', actualizarBono)
router.delete('/bonos/:_id', borrarBono)
export default router