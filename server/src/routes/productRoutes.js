const express = require('express')
const router = express.Router()

const {
  getProducts,
  getProductById,
  getCategorias,
  getMarcas,
  getCategoriasAgrupadas,
  getProductsByCategoriaPadre,
  getDescuentos,
  getMasBuscados
} = require('../controllers/productController')

router.get('/', getProducts)
router.get('/categorias', getCategorias)
router.get('/categorias-agrupadas', getCategoriasAgrupadas)
router.get('/descuentos', getDescuentos)
router.get('/mas-buscados', getMasBuscados)
router.get('/marcas', getMarcas)
router.get('/categoria/:nombre', getProductsByCategoriaPadre)
router.get('/:id', getProductById)

module.exports = router