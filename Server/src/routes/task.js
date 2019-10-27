import {Router} from 'express'
const router = Router()
import { nuevaTarea, todasTareas, tareaCargo, borrarTarea, actualizarTarea } from '../controllers/task.controller'

router.post('/tareas', nuevaTarea)
router.get('/tareas', todasTareas)
router.get('/tareas/:_id', tareaCargo)
router.delete('/tareas/:_id',borrarTarea)
router.put('/tareas/:_id', actualizarTarea)
export default router