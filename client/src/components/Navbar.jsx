import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Navbar({ onBusqueda, busqueda }) {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-cyan-400 tracking-tight">
        DemTech
      </Link>

      {/* Buscador — solo se muestra si le pasamos la prop onBusqueda */}
      {onBusqueda && (
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda || ''}
          onChange={e => onBusqueda(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-500 rounded-lg px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
        />
      )}

      <div className="flex gap-3 items-center">
        {usuario ? (
          <>
            <span className="text-sm text-gray-400">Hola, {usuario.nombre}</span>
            <Link
              to="/favoritos"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              ♡ Favoritos
            </Link>
            <button
              onClick={() => { logout(); navigate('/') }}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm px-4 py-2 rounded-lg transition"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar