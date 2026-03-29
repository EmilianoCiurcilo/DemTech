import dotenv from 'dotenv'
dotenv.config()
import Product from '../models/Product.js'
import puppeteer from 'puppeteer'
import mongoose from 'mongoose'

const CATEGORIAS = [
  { url: 'notebooks', nombre: 'Notebooks' },
  { url: 'pcs-all-in-one-', nombre: 'Pcs All in One' },
  { url: 'pcs-mini-', nombre: 'PCs Mini' },
  { url: 'motherboards', nombre: 'Motherboards' },
  { url: 'procesadores', nombre: 'Procesadores' },
  { url: 'memorias-ram', nombre: 'Memorias RAM' },
  { url: 'almacenamiento', nombre: 'Almacenamiento' },
  { url: 'placas-de-video', nombre: 'Placas de video' },
  { url: 'fuentes-de-poder', nombre: 'Fuentes de Poder' },
  { url: 'gabinetes', nombre: 'Gabinetes' },
  { url: 'refrigeracion-pc', nombre: 'Refrigeración PC' },
  { url: 'combos-actualizacion-pc', nombre: 'Combos Actualización PC' },
  { url: 'teclados,-mouses-y-pads', nombre: 'Teclados, Mouses y Pads' },
  { url: 'auriculares-y-microfonos-', nombre: 'Auriculares y Micrófonos' },
  { url: 'camaras-web-e-ip', nombre: 'Cámaras Web e IP' },
  { url: 'streaming-', nombre: 'Streaming' },
  { url: 'monitores', nombre: 'Monitores' },
  { url: 'impresoras-y-plotters', nombre: 'Impresoras y Plotters' },
  { url: 'conectividad-y-redes', nombre: 'Conectividad y Redes' },
  { url: 'ups-y-estabilizadores', nombre: 'UPS y Estabilizadores' },
  { url: 'sillas-gamers-', nombre: 'Sillas gamers' },
  { url: 'consolas-', nombre: 'Consolas' },
  { url: 'volantes-y-gamepads', nombre: 'Volantes y Gamepads' },
  { url: 'parlantes-y-audio', nombre: 'Parlantes y Audio' },
  { url: 'proyectores-', nombre: 'Proyectores' },
  { url: 'software', nombre: 'Software' },
  { url: 'tablets-y-ebooks', nombre: 'Tablets y eBooks' },
  { url: 'tabletas-graficas', nombre: 'Tabletas Gráficas'},
  { url: 'tv-', nombre: 'Tv' },
  { url: 'liquidacion', nombre: 'Liquidación' },
  { url: 'outlet', nombre: 'Outlet' },
]

async function scrapeMexx() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('✅ MongoDB conectado')

  const browser = await puppeteer.launch({ headless: true })
  let totalGuardados = 0

  for (const cat of CATEGORIAS) {
    console.log(`\n🔍 Scrapeando: ${cat.nombre}`)
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36')

    try {
      // Intentar con ?all=1 primero, si falla sin parámetro
      let cargado = false
      for (const sufijo of ['/?all=1', '/']) {
        try {
          const url = `https://www.mexx.com.ar/productos-rubro/${cat.url}${sufijo}`
          await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
          await page.waitForSelector('div.card.card-ecommerce', { timeout: 10000 })
          cargado = true
          break
        } catch {
          console.log(`   ↩️ Reintentando sin ?all=1...`)
        }
      }

      if (!cargado) {
        console.log(`   ⚠️ Sin productos o categoría no existe`)
        await page.close()
        continue
      }

      const productos = await page.evaluate((categoriaNombre) => {
        const cards = document.querySelectorAll('div.card.card-ecommerce')
        return Array.from(cards).map(card => {
          const nombre = card.querySelector('h4.card-title')?.innerText?.trim() || ''
          const link = card.querySelector('div.view.overlay a')?.getAttribute('href') || ''
          const imagen = card.querySelector('div.view.overlay a img')?.getAttribute('src') || ''
          const precioRaw = card.querySelector('div.price h4')?.innerText?.trim() || ''
          const precioNum = parseFloat(precioRaw.replace(/[^0-9,]/g, '').replace(',', '.')) || 0
          const stock = !!card.querySelector('div.btn-success.enstocklistado')
          return { nombre, url: link, imagen, precio: precioNum, stock, categoria: categoriaNombre, tienda: 'Mexx', marca: '' }
        }).filter(p => p.nombre && p.precio > 0)
      }, cat.nombre)

      console.log(`   → ${productos.length} productos encontrados`)

      for (const p of productos) {
        try {
          await Product.findOneAndUpdate(
            { nombre: p.nombre, tienda: p.tienda },
            { ...p, ultimaActualizacion: new Date() },
            { upsert: true, new: true }
          )
          totalGuardados++
        } catch (err) {
          console.error(`   ⚠️ Error guardando "${p.nombre}":`, err.message)
        }
      }

      console.log(`   ✅ ${productos.length} guardados`)

    } catch (err) {
      console.error(`   ❌ Error en ${cat.nombre}:`, err.message)
    }

    await page.close()
    await new Promise(r => setTimeout(r, 2000))
  }

  await browser.close()
  await mongoose.disconnect()
  console.log(`\n🎉 Mexx finalizado. Total: ${totalGuardados} productos`)
}

scrapeMexx()