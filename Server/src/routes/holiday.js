import {Router} from 'express'
import {nuevasVacaciones, obtenerVacaciones, eliminarVacaciones, actualizarVacaciones, obtenerVacacionesID} from '../controllers/holiday.controller'
const router = Router()

router.post('/vacaciones', nuevasVacaciones)
router.get('/vacaciones', obtenerVacaciones)
router.get('/vacaciones/:_id', obtenerVacacionesID)
router.delete('/vacaciones/:_id', eliminarVacaciones)
router.put('/vacaciones/:_id', actualizarVacaciones)

export default router