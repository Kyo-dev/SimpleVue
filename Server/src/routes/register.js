import {Router} from 'express'
const router = Router()
import { registerAdmin } from '../controllers/register.controller'
router.post('/', registerAdmin)
export default router

