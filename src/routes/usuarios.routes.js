import {Router} from 'express'
import {getUsuarios,getUsuario,createUsuario,updateUsuario,deleteUsuario,login} from '../controllers/usuarios.controller.js'
import { userRules, validate } from '../middleware/usuarioValidator.js'


const router = Router()

router.get('/', getUsuarios )

router.get('/:id', getUsuario )

router.post('/', userRules(), validate, createUsuario)

router.post('/login', userRules(), validate, login)

router.patch('/:id', updateUsuario)

router.delete('/:id', deleteUsuario)

export default router