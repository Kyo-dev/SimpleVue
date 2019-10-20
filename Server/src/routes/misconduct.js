import {Router} from 'express'
import { nuevaDisciplina, todasDisciplinas, disciplinaID, actualizarDisciplina, borrarDisciplina} from '../controllers/misconduct.controller'
const router = Router()

router.post('/disciplina', nuevaDisciplina)
router.get('/disciplina', todasDisciplinas)
router.get('/disciplina/:_id', disciplinaID)
router.put('/disciplina/:_id', actualizarDisciplina)
router.delete('/disciplina/:_id', borrarDisciplina)
export default router