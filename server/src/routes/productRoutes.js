import express from 'express'
import {
  getProducts,
  getProductById,
  getCategorias,
  getMarcas,
  getCategoriasAgrupadas,
  getProductsByCategoriaPadre,
  getDescuentos,
  getMasBuscados
} from '../controllers/productController.js'

const router = express.Router()

router.get('/', getProducts)
router.get('/categorias', getCategorias)
router.get('/categorias-agrupadas', getCategoriasAgrupadas)
router.get('/descuentos', getDescuentos)
router.get('/mas-buscados', getMasBuscados)
router.get('/marcas', getMarcas)
router.get('/categoria/:nombre', getProductsByCategoriaPadre)
router.get('/:id', getProductById)

export default router