import {Router} from 'express'
const router = Router()
import { nuevaTarea, todasTareas, tareaCargo, borrarTarea, actaulizarTarea } from '../controllers/task.controller'

router.post('/tareas', nuevaTarea)
router.get('/tareas', todasTareas)
router.get('/tareas/:_id', tareaCargo)
router.delete('/tareas/:_id',borrarTarea)
router.put('/tareas', actaulizarTarea)
export default router