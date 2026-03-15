import express from 'express'
import { register, login, getMe, updatePerfil } from '../controllers/authController.js'
import { proteger } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', proteger, getMe)
router.put('/perfil', proteger, updatePerfil)

export default router