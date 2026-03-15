import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import authRoutes from './routes/authRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/favorites', favoriteRoutes)

app.use('/api/products', productRoutes)

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'PrecioPC API funcionando' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})