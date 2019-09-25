import {Router} from 'express'
import { newPermit, allPermits, permitDNI, deletePermitID, updatePermitID } from '../controllers/permits.controller'
const router = Router()

router.post('/permisos', newPermit)
router.get('/permisos', allPermits)
router.get('/permisos/:_dni', permitDNI)
router.delete('/permisos/:_id', deletePermitID)
router.put('/permisos/:_id', updatePermitID)

export default router
