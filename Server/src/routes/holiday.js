import {Router} from 'express'
const router = Router()
import {nuevasVacaciones, obtenerVacaciones, eliminarVacaciones, actualizarVacaciones} from '../controllers/holiday.controller'

router.post('/vacaciones', nuevasVacaciones)
router.get('/vacaciones', obtenerVacaciones)
router.delete('/vacaciones', eliminarVacaciones)
router.put('/vacaciones', actualizarVacaciones)

export default router