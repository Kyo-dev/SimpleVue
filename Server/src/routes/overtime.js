import {Router} from 'express'
import { nuevaHorasExtra, horasExtraEmpleado, actualizarHorasExtra, borrarHorasExtra } from '../controllers/overtime.controller'
const router = Router()

router.post('/horas-extra', nuevaHorasExtra)
router.get('/horas-extra/:_cedula', horasExtraEmpleado)
router.put('/horas-extra', actualizarHorasExtra)
router.delete('/horas-extra/:_id', borrarHorasExtra)
export default router