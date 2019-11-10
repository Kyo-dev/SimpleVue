import {Router} from 'express'
import { nuevaHorasExtra, todasHorasExtra, horasExtraID, actualizarHorasExtra, borrarHorasExtra } from '../controllers/overtime.controller'
const router = Router()

router.post('/horas-extra', nuevaHorasExtra)
router.get('/horas-extra/:_id', horasExtraID)
router.get('/horas-extra', todasHorasExtra)
router.put('/horas-extra/:_id', actualizarHorasExtra)
router.delete('/horas-extra/:_id', borrarHorasExtra)
export default router