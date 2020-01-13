import {Router} from 'express'
import {nuevaRetencion, obtenerRetenciones} from '../controllers/wageWithholding.controller.js'
const router = Router()

router.post('/retencion', nuevaRetencion)
router.get('/retencion', obtenerRetenciones)

export default router