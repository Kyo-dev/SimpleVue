import {Router} from 'express'
const router = Router()
import { nuevaTarea, todasTareasDoctor, todasTareasDependiente,todasTareasMensajero, tareaCargo, borrarTarea, actualizarTarea } from '../controllers/task.controller'

router.post('/tareas', nuevaTarea)
router.get('/tareas-doctor', todasTareasDoctor)
router.get('/tareas-dependiente', todasTareasDependiente)
router.get('/tareas-mensajero', todasTareasMensajero)
router.get('/tareas/:_id', tareaCargo)
router.delete('/tareas/:_id',borrarTarea)
router.put('/tareas/:_id', actualizarTarea)
export default router