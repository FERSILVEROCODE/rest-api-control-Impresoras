import {Router} from 'express'
import {getImpresoras, createImpresora, updateImpresora, deleteImpresora, getImpresora} from '../controllers/impresoras.controller.js'
import {reglas_para_validar_id,rulesCreate,rulesList,validate } from '../middleware/impresoraValidator.js'
import {isAutenticated} from '../middleware/usuarioValidator.js'


const router = Router()

router.get('/', getImpresoras )

router.get('/:id',reglas_para_validar_id(),validate ,getImpresora )

router.post('/',rulesCreate(),validate,createImpresora)

router.patch('/:id', updateImpresora)

router.delete('/:id', deleteImpresora)

export default router