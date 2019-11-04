import {Router} from 'express'
import { nuevoPermiso, todosPermisos, permisoID, borrarPermiso, actualizarPermiso } from '../controllers/permits.controller'
const router = Router()

router.post('/permisos', nuevoPermiso)
router.get('/permisos', todosPermisos)
router.get('/permisos/:_id', permisoID)
router.put('/permisos/:_id', actualizarPermiso)
router.delete('/permisos', borrarPermiso)

export default router
