import express from 'express'
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js'
import { proteger } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', proteger, getFavorites)
router.post('/', proteger, addFavorite)
router.delete('/:productoId', proteger, removeFavorite)

export default router