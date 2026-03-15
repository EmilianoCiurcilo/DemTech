import 'dotenv/config'
import Product from '../models/Product.js'
import CATEGORY_MAP from '../config/categoryMap.js'

export const getProducts = async (req, res) => {
  try {
    const { categoria, tienda, marca, precioMin, precioMax, orden, busqueda, page = 1, limit = 20 } = req.query
    const filtro = {}
    if (categoria) filtro.categoria = categoria
    if (tienda) filtro.tienda = tienda
    if (marca) filtro.marca = marca
    if (busqueda) filtro.nombre = { $regex: busqueda, $options: 'i' }
    if (precioMin || precioMax) {
      filtro.precio = {}
      if (precioMin) filtro.precio.$gte = Number(precioMin)
      if (precioMax) filtro.precio.$lte = Number(precioMax)
    }
    const ordenMap = {
      'precio_asc': { precio: 1 },
      'precio_desc': { precio: -1 },
      'nombre_asc': { nombre: 1 },
      'reciente': { ultimaActualizacion: -1 },
      'descuento': { descuento: -1 }
    }
    const ordenFinal = ordenMap[orden] || { ultimaActualizacion: -1 }
    const skip = (Number(page) - 1) * Number(limit)
    const [productos, total] = await Promise.all([
      Product.find(filtro).sort(ordenFinal).skip(skip).limit(Number(limit)),
      Product.countDocuments(filtro)
    ])
    res.json({ productos, total, pagina: Number(page), totalPaginas: Math.ceil(total / Number(limit)) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id)
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' })
    await Product.findByIdAndUpdate(req.params.id, { $inc: { vistas: 1 } })
    res.json(producto)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Product.distinct('categoria')
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getMarcas = async (req, res) => {
  try {
    const marcas = await Product.distinct('marca')
    res.json(marcas)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getCategoriasAgrupadas = async (req, res) => {
  try {
    res.json(CATEGORY_MAP)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getProductsByCategoriaPadre = async (req, res) => {
  try {
    const { nombre } = req.params
    const categoria = CATEGORY_MAP.find(c =>
      c.nombre.toLowerCase() === decodeURIComponent(nombre).toLowerCase()
    )
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' })
    const { precioMin, precioMax, orden, page = 1, limit = 20 } = req.query
    const filtro = { categoria: { $in: categoria.subcategorias } }
    if (precioMin || precioMax) {
      filtro.precio = {}
      if (precioMin) filtro.precio.$gte = Number(precioMin)
      if (precioMax) filtro.precio.$lte = Number(precioMax)
    }
    const ordenMap = {
      'precio_asc': { precio: 1 },
      'precio_desc': { precio: -1 },
      'nombre_asc': { nombre: 1 },
      'descuento': { descuento: -1 }
    }
    const ordenFinal = ordenMap[orden] || { ultimaActualizacion: -1 }
    const skip = (Number(page) - 1) * Number(limit)
    const [productos, total] = await Promise.all([
      Product.find(filtro).sort(ordenFinal).skip(skip).limit(Number(limit)),
      Product.countDocuments(filtro)
    ])
    res.json({ productos, total, pagina: Number(page), totalPaginas: Math.ceil(total / Number(limit)) })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getDescuentos = async (req, res) => {
  try {
    const productos = await Product.find({ descuento: { $gt: 0 } }).sort({ descuento: -1 }).limit(10)
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getMasBuscados = async (req, res) => {
  try {
    const productos = await Product.find().sort({ vistas: -1 }).limit(10)
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}