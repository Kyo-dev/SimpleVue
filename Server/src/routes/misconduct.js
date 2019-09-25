import {Router} from 'express'
import { newMisconduct, allMisconduct, misconductID, updateMisconduct, deleteMisconduct} from '../controllers/misconduct.controller'
const router = Router()

router.post('/disciplina', newMisconduct)
router.get('/disciplina', allMisconduct)
router.get('/disciplina/:_id', misconductID)
router.put('/disciplina/:_id', updateMisconduct)
router.delete('/disciplina/:_id', deleteMisconduct)
export default router