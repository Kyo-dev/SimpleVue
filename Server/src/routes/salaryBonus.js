import {Router} from 'express'
const router = Router()
import { newBonus, allBonus, bonusDNI } from '../controllers/salaryBonus.controller'

router.post('/bonos', newBonus)
router.get('/bonos', allBonus)
router.get('/bonos/:_dni', bonusDNI)
export default router