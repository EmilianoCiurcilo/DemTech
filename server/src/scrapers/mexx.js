const puppeteer = require('puppeteer')
const Product = require('../models/Product')
const connectDB = require('../config/db')
require('dotenv').config()

const CATEGORIAS = [
  { nombre: 'Procesadores AMD',        url: 'https://www.mexx.com.ar/productos-rubro/procesadores/?all=1',              scrapeSpecs: true },
  { nombre: 'Procesadores Intel',       url: 'https://www.mexx.com.ar/productos-rubro/procesadores/?all=1',              scrapeSpecs: true },
  { nombre: 'Placas de video NVIDIA',   url: 'https://www.mexx.com.ar/productos-rubro/placas-de-video/?all=1',           scrapeSpecs: true },
  { nombre: 'Placas de video AMD',      url: 'https://www.mexx.com.ar/productos-rubro/placas-de-video/?all=1',           scrapeSpecs: true },
  { nombre: 'Discos SSD',              url: 'https://www.mexx.com.ar/productos-rubro/almacenamiento/?all=1',             scrapeSpecs: false },
  { nombre: 'Memorias RAM',            url: 'https://www.mexx.com.ar/productos-rubro/memorias-ram/?all=1',               scrapeSpecs: true },
  { nombre: 'Mothers AMD',             url: 'https://www.mexx.com.ar/productos-rubro/motherboards/?all=1',               scrapeSpecs: true },
  { nombre: 'Mothers Intel',           url: 'https://www.mexx.com.ar/productos-rubro/motherboards/?all=1',               scrapeSpecs: true },
  { nombre: 'Fuentes de alimentacion', url: 'https://www.mexx.com.ar/productos-rubro/fuentes-de-poder/?all=1',           scrapeSpecs: false },
  { nombre: 'Gabinetes',               url: 'https://www.mexx.com.ar/productos-rubro/gabinetes/?all=1',                  scrapeSpecs: false },
  { nombre: 'Coolers CPU',             url: 'https://www.mexx.com.ar/productos-rubro/refrigeracion-pc/?all=1',           scrapeSpecs: false },
  { nombre: 'Kits de actualizacion',   url: 'https://www.mexx.com.ar/productos-rubro/combos-actualizacion-pc/?all=1',    scrapeSpecs: false },
]

function limpiarPrecio(texto) {
  if (!texto) return null
  return Number(texto.replace(/[^0-9]/g, ''))
}

function detectarMarca(nombre) {
  const n = nombre.toLowerCase()
  if (n.includes('amd') || n.includes('ryzen') || n.includes('athlon')) return 'AMD'
  if (n.includes('intel') || n.includes('core i') || n.includes('core ultra') || n.includes('pentium') || n.includes('celeron')) return 'Intel'
  if (n.includes('nvidia') || n.includes('geforce') || n.includes('rtx') || n.includes('gtx')) return 'NVIDIA'
  if (n.includes('asus')) return 'ASUS'
  if (n.includes('msi')) return 'MSI'
  if (n.includes('gigabyte') || n.includes('aorus')) return 'Gigabyte'
  if (n.includes('corsair')) return 'Corsair'
  if (n.includes('kingston') || n.includes('fury')) return 'Kingston'
  if (n.includes('samsung')) return 'Samsung'
  if (n.includes('seagate')) return 'Seagate'
  if (n.includes('western digital') || n.includes(' wd ')) return 'Western Digital'
  if (n.includes('logitech')) return 'Logitech'
  if (n.includes('cooler master')) return 'Cooler Master'
  if (n.includes('nzxt')) return 'NZXT'
  if (n.includes('evga')) return 'EVGA'
  if (n.includes('deepcool')) return 'Deepcool'
  if (n.includes('thermaltake')) return 'Thermaltake'
  return null
}

async function scrapearCategoria(page, categoria) {
  console.log(`\n📦 Scrapeando: ${categoria.nombre} — ${categoria.url}`)

  await page.goto(categoria.url, { waitUntil: 'networkidle2', timeout: 60000 })

  // Esperar que carguen los productos
  try {
    await page.waitForSelector('.product-item, .producto, article, .card', { timeout: 15000 })
  } catch {
    console.log(`  ⚠️ No se detectaron productos en ${categoria.nombre}`)
    return []
  }

  // Scroll para asegurar carga completa
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let totalHeight = 0
      const distance = 500
      const timer = setInterval(() => {
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 150)
    })
  })

  await new Promise(r => setTimeout(r, 2000))

  // Extraer productos — inspeccionamos el DOM
  const productos = await page.evaluate(() => {
    const resultados = []

    // Mexx usa diferentes selectores — probamos varios
    const cards = document.querySelectorAll(
      '.product-item, .producto-item, .item-product, article.product, .woocommerce-LoopProduct, li.product, .product_item'
    )

    cards.forEach(card => {
      // Nombre
      const nombreEl = card.querySelector(
        'h2, h3, h4, .product-title, .woocommerce-loop-product__title, .product-name, .nombre'
      )
      const nombre = nombreEl?.textContent?.trim()
      if (!nombre) return

      // Precio actual
      const precioEl = card.querySelector(
        '.price ins .amount, .price .amount, .woocommerce-Price-amount, .precio, .product-price, [class*="price"]'
      )
      const precioTexto = precioEl?.textContent?.trim()
      if (!precioTexto) return

      // Precio anterior (tachado)
      const precioAntEl = card.querySelector(
        '.price del .amount, del .woocommerce-Price-amount, .price-old, .precio-anterior, [class*="old"]'
      )
      const precioAntTexto = precioAntEl?.textContent?.trim() || null

      // Imagen
      const imgEl = card.querySelector('img')
      const imagen = imgEl?.src || imgEl?.getAttribute('data-src') || ''

      // URL del producto
      const linkEl = card.querySelector('a')
      const url = linkEl?.href || ''

      resultados.push({ nombre, precioTexto, precioAntTexto, imagen, url })
    })

    return resultados
  })

  console.log(`  → Encontrados ${productos.length} productos en DOM`)

  if (productos.length === 0) {
    // Debug: mostrar HTML para ajustar selectores
    const html = await page.evaluate(() => document.body.innerHTML.substring(0, 3000))
    console.log('  ⚠️ HTML muestra:', html)
    return []
  }

  const resultados = []
  for (const p of productos) {
    const precio = limpiarPrecio(p.precioTexto)
    if (!precio || precio < 100) continue

    const precioAnterior = limpiarPrecio(p.precioAntTexto)
    const descuento = precioAnterior && precioAnterior > precio
      ? Math.round(((precioAnterior - precio) / precioAnterior) * 100)
      : 0

    const marca = detectarMarca(p.nombre)

    try {
      await Product.findOneAndUpdate(
        { nombre: p.nombre, tienda: 'Mexx' },
        {
          $set: {
            nombre: p.nombre,
            marca,
            categoria: categoria.nombre,
            precio,
            precioAnterior: precioAnterior || null,
            descuento,
            tienda: 'Mexx',
            url: p.url,
            imagen: p.imagen,
            stock: true,
            ultimaActualizacion: new Date()
          }
        },
        { upsert: true, returnDocument: 'after' }
      )
      resultados.push(p.nombre)
    } catch (err) {
      if (!err.message.includes('duplicate')) console.error('  Error guardando:', err.message)
    }
  }

  console.log(`  ✅ Guardados: ${resultados.length} productos`)
  return resultados
}

async function scrapearMexx() {
  await connectDB()
  console.log('🚀 Iniciando scraper Mexx...')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36')
  await page.setViewport({ width: 1366, height: 768 })

  let totalGuardados = 0

  for (const categoria of CATEGORIAS) {
    const productos = await scrapearCategoria(page, categoria)
    totalGuardados += productos.length
    // Pausa entre categorías para no sobrecargar
    await new Promise(r => setTimeout(r, 3000))
  }

  await browser.close()
  console.log(`\n✅ Mexx finalizado. Total guardados: ${totalGuardados}`)
  process.exit(0)
}

scrapearMexx()