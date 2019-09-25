import {Router} from 'express'
const router = Router()
import { newBonus, allBonus, bonusDNI, deleteBonusID, updateBonoID } from '../controllers/salaryBonus.controller'

router.post('/bonos', newBonus)
router.get('/bonos', allBonus)
router.get('/bonos/:_dni', bonusDNI)
router.delete('/bonos/:_id', deleteBonusID)
router.put('/bonos/:_id', updateBonoID)
export default router