const puppeteer = require('puppeteer')
require('dotenv').config()

async function test() {
  const browser = await puppeteer.launch({ headless: false }) // headless false para ver el navegador
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36')
  
  await page.goto('https://www.mexx.com.ar/productos-rubro/procesadores/?all=1', { 
    waitUntil: 'networkidle2', 
    timeout: 60000 
  })

  await new Promise(r => setTimeout(r, 3000))

  // Ver qué selectores existen en la página
  const info = await page.evaluate(() => {
    const selectores = [
      '.product-item', '.producto-item', 'article.product',
      '.woocommerce-LoopProduct', 'li.product', '.item-product',
      '.product_item', '.products li', 'ul.products'
    ]
    const resultado = {}
    selectores.forEach(sel => {
      resultado[sel] = document.querySelectorAll(sel).length
    })

    // Primer producto que encuentre
    const primerLink = document.querySelector('a[href*="producto"], a[href*="product"]')
    resultado['primerLink'] = primerLink?.href || 'ninguno'
    resultado['title'] = document.title

    return resultado
  })

  console.log('Selectores encontrados:', info)
  await browser.close()
}

test()