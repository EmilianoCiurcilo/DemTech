import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import logoPPC from '../assets/logo-ppc.png'
import favoritoIcon from '../assets/favorito.svg'

function Navbar({ onBusqueda, busqueda, onBusquedaKeyDown, onBusquedaSubmit }) {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5"
      style={{ background: 'rgba(8,8,15,0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-screen-xl mx-auto px-6 py-3 flex items-center gap-6">

        {/* Logo */}
        <Link to="/" className="shrink-0">
            <img src={logoPPC} alt="PrecioPC" className="h-18 object-contain" />
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: 'Inicio', to: '/' },
            { label: 'Productos', to: '/productos' },
            { label: 'Contacto', to: '/contacto' },
          ].map(link => (
            <Link key={link.to} to={link.to}
              className="text-sm px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Buscador */}
        {onBusqueda && (
    <div className="flex-1 max-w-md relative">
      <button
  onClick={onBusquedaSubmit}
  className="absolute left-3 top-1/2 -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer flex items-center"
  tabIndex={-1}
>
  <svg className="w-4 h-4 text-gray-500 hover:text-violet-400 transition"
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
  </svg>
</button>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda || ''}
        onChange={e => onBusqueda(e.target.value)}
        onKeyDown={onBusquedaKeyDown}
        className="w-full pl-9 pr-4 py-2 rounded-xl text-sm text-white placeholder-gray-500 border border-white/10 focus:outline-none focus:border-violet-500 transition"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      />
    </div>
  )}

        {/* Auth */}
        <div className="ml-auto flex items-center gap-3 shrink-0">
          {usuario ? (
            <>
              <Link to="/favoritos" 
  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition">
  <img src={favoritoIcon} width={14} height={14} alt=""
    style={{ filter: 'brightness(0) saturate(100%) invert(72%) sepia(42%) saturate(600%) hue-rotate(210deg) brightness(105%)' }} />
  <span>Favoritos</span>
</Link>
              <Link to="/perfil"
                className="text-sm text-gray-400 hover:text-white transition">
                {usuario.nombre}
              </Link>
              <button onClick={() => { logout(); navigate('/') }}
                className="text-xs text-gray-600 hover:text-gray-400 transition">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-sm text-gray-400 hover:text-white transition">
                Iniciar sesión
              </Link>
              <Link to="/register"
                className="text-sm font-semibold px-4 py-2 rounded-xl transition"
                style={{ background: '#7c3aed', color: 'white' }}>
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar