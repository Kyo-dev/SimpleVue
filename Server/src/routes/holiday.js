import {Router} from 'express'
const router = Router()
import {nuevasVacaciones, obtenerVacaciones, eliminarVacaciones, actualizarVacaciones, obtenerVacacionesEmpleado} from '../controllers/holiday.controller'

router.post('/vacaciones', nuevasVacaciones)
router.get('/vacaciones', obtenerVacaciones)
router.get('/vacaciones/:_cedula', obtenerVacacionesEmpleado)
router.delete('/vacaciones/:_id', eliminarVacaciones)
router.put('/vacaciones/:_id', actualizarVacaciones)

export default router