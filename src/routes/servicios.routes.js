import {Router} from 'express'
import {getServicios,getServicio,createServicio,updateServicio,deleteServicio} from '../controllers/servicios.controller.js'

const router = Router()

router.get('/', getServicios )

router.get('/:id', getServicio )

router.post('/', createServicio)

router.patch('/:id', updateServicio)

router.delete('/:id', deleteServicio)

export default router