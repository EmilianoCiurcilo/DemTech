import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getFavorites, removeFavorite } from '../services/productService'
import Navbar from '../components/Navbar'

// sacá const { usuario, logout } — ya los maneja Navbar internamente
// pero dejá const { usuario } solo para el fetch de favoritos

// reemplazá el <nav>...</nav> por:


function Favorites() {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [favoritos, setFavoritos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!usuario) return navigate('/login')
    const fetchFavoritos = async () => {
      try {
        const data = await getFavorites(usuario.token)
        setFavoritos(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchFavoritos()
  }, [usuario, navigate])

  const handleRemove = async (productoId) => {
    try {
      await removeFavorite(productoId, usuario.token)
      setFavoritos(prev => prev.filter(f => f.producto._id !== productoId))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-white mb-2">Mis favoritos</h2>
        <p className="text-gray-500 text-sm mb-8">
          Te notificaremos cuando alguno de estos productos baje de precio.
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-4 animate-pulse">
                <div className="bg-gray-800 h-40 rounded-lg mb-3" />
                <div className="bg-gray-800 h-3 rounded mb-2" />
                <div className="bg-gray-800 h-5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : favoritos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-5xl">♡</p>
            <p className="text-gray-400 text-lg">No tenés favoritos todavía</p>
            <button
              onClick={() => navigate('/')}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl transition"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoritos.map(({ producto, precioAlAgregar }) => {
              const bajoPrecio = producto.precio < precioAlAgregar
              const diferencia = precioAlAgregar - producto.precio

              return (
                <div
                  key={producto._id}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col hover:border-cyan-500 transition group"
                >
                  <div
                    className="bg-gray-800 rounded-lg mb-3 flex items-center justify-center h-40 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/producto/${producto._id}`)}
                  >
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="h-full object-contain group-hover:scale-105 transition"
                      onError={e => e.target.style.display = 'none'}
                    />
                  </div>

                  <p className="text-xs text-cyan-400 font-medium mb-1">{producto.categoria}</p>
                  <p
                    className="text-sm text-white font-medium leading-snug mb-3 flex-1 line-clamp-3 cursor-pointer"
                    onClick={() => navigate(`/producto/${producto._id}`)}
                  >
                    {producto.nombre}
                  </p>

                  <div className="mt-auto">
                    <p className="text-lg font-bold text-white">
                      ${producto.precio?.toLocaleString('es-AR')}
                    </p>

                    {bajoPrecio && (
                      <p className="text-xs text-green-400 font-medium mt-1">
                        ↓ Bajó ${diferencia.toLocaleString('es-AR')} desde que lo guardaste
                      </p>
                    )}

                    {!bajoPrecio && precioAlAgregar !== producto.precio && (
                      <p className="text-xs text-red-400 mt-1">
                        ↑ Subió desde que lo guardaste
                      </p>
                    )}

                    <p className="text-xs text-gray-600 mt-1">
                      Precio al guardar: ${precioAlAgregar?.toLocaleString('es-AR')}
                    </p>

                    <button
                      onClick={() => handleRemove(producto._id)}
                      className="mt-3 w-full text-xs text-red-400 hover:text-red-300 border border-red-900 hover:border-red-700 py-2 rounded-lg transition"
                    >
                      Quitar de favoritos
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites