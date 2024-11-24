import {Router} from 'express'
import {getMantenimientos, getMantenimiento, createMantenimiento, updateMantenimiento, deleteMantenimiento } from '../controllers/mantenimientos.controller.js'

const router = Router()

router.get('/', getMantenimientos )

router.get('/:id', getMantenimiento )

router.post('/', createMantenimiento)

router.patch('/:id', updateMantenimiento)

router.delete('/:id', deleteMantenimiento)

export default router