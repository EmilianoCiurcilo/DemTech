function CategoryIcon({ nombre, size = 28 }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { display: 'block' }
  }
  const s = "#a78bfa"

  const icons = {
    'Procesadores': (
      <svg {...props}>
        <rect x="8" y="8" width="16" height="16" rx="2" stroke={s} strokeWidth="1.5"/>
        <rect x="12" y="12" width="8" height="8" rx="1" fill={s} fillOpacity="0.25"/>
        <line x1="11" y1="4" x2="11" y2="8" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="4" x2="16" y2="8" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="21" y1="4" x2="21" y2="8" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="24" x2="11" y2="28" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="24" x2="16" y2="28" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="21" y1="24" x2="21" y2="28" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="11" x2="8" y2="11" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="16" x2="8" y2="16" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="4" y1="21" x2="8" y2="21" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="11" x2="28" y2="11" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="16" x2="28" y2="16" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="21" x2="28" y2="21" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Placas de Video': (
      <svg {...props}>
        <rect x="3" y="9" width="26" height="14" rx="2" stroke={s} strokeWidth="1.5"/>
        <rect x="7" y="13" width="10" height="6" rx="1" stroke={s} strokeWidth="1.2"/>
        <circle cx="21" cy="16" r="2.5" stroke={s} strokeWidth="1.2"/>
        <line x1="7" y1="23" x2="7" y2="27" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="23" x2="11" y2="27" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="15" y1="23" x2="15" y2="27" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="19" y1="23" x2="19" y2="27" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="23" y1="23" x2="23" y2="27" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Motherboards': (
      <svg {...props}>
        <rect x="3" y="3" width="26" height="26" rx="2" stroke={s} strokeWidth="1.5"/>
        <rect x="7" y="7" width="8" height="8" rx="1" stroke={s} strokeWidth="1.2"/>
        <rect x="18" y="7" width="7" height="4" rx="1" stroke={s} strokeWidth="1.2"/>
        <rect x="18" y="13" width="7" height="4" rx="1" stroke={s} strokeWidth="1.2"/>
        <rect x="7" y="18" width="18" height="7" rx="1" stroke={s} strokeWidth="1.2"/>
        <line x1="9" y1="18" x2="9" y2="15" stroke={s} strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round"/>
        <line x1="13" y1="18" x2="13" y2="15" stroke={s} strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round"/>
        <line x1="10" y1="21" x2="22" y2="21" stroke={s} strokeWidth="1" strokeOpacity="0.6" strokeLinecap="round"/>
      </svg>
    ),
    'Memorias RAM': (
      <svg {...props}>
        <rect x="4" y="10" width="24" height="12" rx="2" stroke={s} strokeWidth="1.5"/>
        <rect x="8" y="14" width="3" height="4" rx="0.5" fill={s} fillOpacity="0.5"/>
        <rect x="13" y="14" width="3" height="4" rx="0.5" fill={s} fillOpacity="0.5"/>
        <rect x="18" y="14" width="3" height="4" rx="0.5" fill={s} fillOpacity="0.5"/>
        <line x1="8" y1="10" x2="8" y2="6" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="10" x2="12" y2="6" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="10" x2="16" y2="6" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="10" x2="20" y2="6" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="10" x2="24" y2="6" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="8" y1="22" x2="8" y2="26" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="22" x2="12" y2="26" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="22" x2="16" y2="26" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="22" x2="20" y2="26" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="24" y1="22" x2="24" y2="26" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Almacenamiento': (
      <svg {...props}>
        <rect x="4" y="8" width="24" height="16" rx="3" stroke={s} strokeWidth="1.5"/>
        <circle cx="22" cy="16" r="3.5" stroke={s} strokeWidth="1.2"/>
        <circle cx="22" cy="16" r="1" fill={s}/>
        <line x1="8" y1="13" x2="15" y2="13" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="8" y1="16" x2="15" y2="16" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="8" y1="19" x2="12" y2="19" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    'Fuentes': (
      <svg {...props}>
        <rect x="4" y="7" width="24" height="18" rx="2" stroke={s} strokeWidth="1.5"/>
        <path d="M17 12L13 17h6l-4 4" stroke={s} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="23" cy="12" r="1.2" fill={s} fillOpacity="0.8"/>
        <circle cx="23" cy="17" r="1.2" fill={s} fillOpacity="0.8"/>
      </svg>
    ),
    'Gabinetes': (
      <svg {...props}>
        <rect x="6" y="2" width="14" height="28" rx="2" stroke={s} strokeWidth="1.5"/>
        <line x1="6" y1="10" x2="20" y2="10" stroke={s} strokeWidth="1" strokeOpacity="0.5"/>
        <circle cx="13" cy="6" r="1.5" fill={s} fillOpacity="0.7"/>
        <rect x="8" y="13" width="8" height="5" rx="1" stroke={s} strokeWidth="1" strokeOpacity="0.8"/>
        <circle cx="13" cy="25" r="1.5" stroke={s} strokeWidth="1"/>
        <rect x="21" y="7" width="5" height="2" rx="1" fill={s} fillOpacity="0.4"/>
        <rect x="21" y="11" width="5" height="2" rx="1" fill={s} fillOpacity="0.4"/>
        <rect x="21" y="15" width="5" height="2" rx="1" fill={s} fillOpacity="0.4"/>
      </svg>
    ),
    'Refrigeración': (
      <svg {...props}>
        <circle cx="16" cy="16" r="11" stroke={s} strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="4" stroke={s} strokeWidth="1.2"/>
        <line x1="16" y1="5" x2="16" y2="12" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="20" x2="16" y2="27" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="5" y1="16" x2="12" y2="16" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="20" y1="16" x2="27" y2="16" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="8.5" y1="8.5" x2="13" y2="13" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="19" y1="19" x2="23.5" y2="23.5" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="23.5" y1="8.5" x2="19" y2="13" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="13" y1="19" x2="8.5" y2="23.5" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    'Pantallas': (
      <svg {...props}>
        <rect x="2" y="4" width="28" height="18" rx="2" stroke={s} strokeWidth="1.5"/>
        <rect x="6" y="8" width="20" height="10" rx="1" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="0.8" strokeOpacity="0.4"/>
        <line x1="16" y1="22" x2="16" y2="27" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="27" x2="21" y2="27" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Periféricos': (
      <svg {...props}>
        <rect x="2" y="11" width="18" height="13" rx="3" stroke={s} strokeWidth="1.5"/>
        <rect x="5" y="14" width="3" height="2" rx="0.5" fill={s} fillOpacity="0.7"/>
        <rect x="10" y="14" width="3" height="2" rx="0.5" fill={s} fillOpacity="0.7"/>
        <rect x="5" y="18" width="9" height="2" rx="0.5" fill={s} fillOpacity="0.4"/>
        <circle cx="25" cy="13" r="5" stroke={s} strokeWidth="1.5"/>
        <line x1="25" y1="13" x2="25" y2="10" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="25" y1="13" x2="27.5" y2="14.5" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    'Notebooks': (
      <svg {...props}>
        <rect x="4" y="5" width="24" height="17" rx="2" stroke={s} strokeWidth="1.5"/>
        <rect x="7" y="8" width="18" height="11" rx="1" fill={s} fillOpacity="0.1" stroke={s} strokeWidth="0.8" strokeOpacity="0.4"/>
        <path d="M2 22h28" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 22l-1 4h8l-1-4" stroke={s} strokeWidth="1" strokeOpacity="0.5"/>
      </svg>
    ),
    'PC Armadas': (
      <svg {...props}>
        <rect x="4" y="2" width="14" height="24" rx="2" stroke={s} strokeWidth="1.5"/>
        <line x1="4" y1="9" x2="18" y2="9" stroke={s} strokeWidth="1" strokeOpacity="0.5"/>
        <circle cx="11" cy="5.5" r="1.2" fill={s} fillOpacity="0.7"/>
        <rect x="6" y="12" width="8" height="5" rx="1" stroke={s} strokeWidth="1" strokeOpacity="0.8"/>
        <circle cx="11" cy="23" r="1.5" stroke={s} strokeWidth="1"/>
        <rect x="20" y="8" width="8" height="12" rx="1.5" stroke={s} strokeWidth="1.2"/>
        <line x1="20" y1="12" x2="28" y2="12" stroke={s} strokeWidth="0.8" strokeOpacity="0.5"/>
        <line x1="20" y1="15" x2="28" y2="15" stroke={s} strokeWidth="0.8" strokeOpacity="0.5"/>
      </svg>
    ),
    'Combos': (
      <svg {...props}>
        <rect x="2" y="14" width="12" height="12" rx="1.5" stroke={s} strokeWidth="1.5"/>
        <rect x="18" y="14" width="12" height="12" rx="1.5" stroke={s} strokeWidth="1.5"/>
        <rect x="10" y="6" width="12" height="12" rx="1.5" stroke={s} strokeWidth="1.5" fill="#08080f"/>
        <line x1="16" y1="9" x2="16" y2="15" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="12" x2="19" y2="12" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'Sillas Gamer': (
      <svg {...props}>
        <path d="M10 4h12a2 2 0 012 2v8H8V6a2 2 0 012-2z" stroke={s} strokeWidth="1.5"/>
        <path d="M8 14h16l-2 9H10l-2-9z" stroke={s} strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="16" y1="23" x2="16" y2="28" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="11" y1="28" x2="21" y2="28" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 9H5a1 1 0 00-1 1v3a1 1 0 001 1h3" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M24 9h3a1 1 0 011 1v3a1 1 0 01-1 1h-3" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    'Consolas de Videojuego': (
      <svg {...props}>
        <path d="M5 12h22l-2 11a3 3 0 01-3 2H10a3 3 0 01-3-2L5 12z" stroke={s} strokeWidth="1.5" strokeLinejoin="round"/>
        <line x1="11" y1="17" x2="11" y2="21" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="9" y1="19" x2="13" y2="19" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="21" cy="17.5" r="1.2" fill={s} fillOpacity="0.8"/>
        <circle cx="23.5" cy="20" r="1.2" fill={s} fillOpacity="0.8"/>
        <path d="M11 12V8a5 5 0 0110 0v4" stroke={s} strokeWidth="1.2" strokeOpacity="0.5"/>
      </svg>
    ),
    'Impresoras e Insumos': (
      <svg {...props}>
        <rect x="5" y="11" width="22" height="13" rx="2" stroke={s} strokeWidth="1.5"/>
        <path d="M9 11V6h14v5" stroke={s} strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="9" y="17" width="14" height="9" rx="1" stroke={s} strokeWidth="1.2"/>
        <line x1="12" y1="20" x2="20" y2="20" stroke={s} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
        <line x1="12" y1="22.5" x2="17" y2="22.5" stroke={s} strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
        <circle cx="23" cy="15" r="1.2" fill={s} fillOpacity="0.7"/>
      </svg>
    ),
    'Otros': (
      <svg {...props}>
        <circle cx="16" cy="16" r="12" stroke={s} strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="2" fill={s}/>
        <circle cx="9" cy="16" r="2" fill={s} fillOpacity="0.5"/>
        <circle cx="23" cy="16" r="2" fill={s} fillOpacity="0.5"/>
      </svg>
    ),
  }

  return icons[nombre] || icons['Otros']
}

export default CategoryIcon