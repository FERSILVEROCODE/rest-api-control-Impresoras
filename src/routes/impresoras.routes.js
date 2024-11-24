import {Router} from 'express'
import {getImpresoras, createImpresora, updateImpresora, deleteImpresora, getImpresora} from '../controllers/impresoras.controller.js'

const router = Router()

router.get('/', getImpresoras )

router.get('/:id', getImpresora )

router.post('/', createImpresora)

router.patch('/:id', updateImpresora)

router.delete('/:id', deleteImpresora)

export default router