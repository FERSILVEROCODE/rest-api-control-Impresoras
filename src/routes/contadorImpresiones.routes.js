import {Router} from 'express'
import {getContadores,getContador,createContador,updateContador,deleteContador } from '../controllers/contadorImpresiones.controller.js'

const router = Router()

router.get('/', getContadores )

router.get('/:id', getContador )

router.post('/', createContador)

router.patch('/:id', updateContador)

router.delete('/:id', deleteContador)

export default router