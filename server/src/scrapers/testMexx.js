import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: false })
const page = await browser.newPage()
await page.goto('https://www.mexx.com.ar/productos-rubro/procesadores/?all=1', { waitUntil: 'networkidle2' })
await page.waitForSelector('div.card.card-ecommerce', { timeout: 15000 })

const productos = await page.evaluate(() => {
  const cards = document.querySelectorAll('div.card.card-ecommerce')
  return Array.from(cards).slice(0, 3).map(card => ({
    nombre: card.querySelector('h4.card-title')?.innerText?.trim(),
    precio: card.querySelector('div.price h4')?.innerText?.trim(),
    imagen: card.querySelector('div.view.overlay a img')?.getAttribute('src'),
    url: card.querySelector('div.view.overlay a')?.getAttribute('href'),
    stock: !!card.querySelector('div.btn-success.enstocklistado'),
  }))
})

console.log(JSON.stringify(productos, null, 2))
await browser.close()