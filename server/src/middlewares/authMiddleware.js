import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const proteger = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No autorizado, token requerido' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = await User.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}