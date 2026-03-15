import almacenamiento from '../assets/categories/almacenamiento.svg'
import consolas from '../assets/categories/consolas.svg'
import cpu from '../assets/categories/cpu.svg'
import fuente from '../assets/categories/fuente-de-energia.svg'
import gabinete from '../assets/categories/gabinete.svg'
import gpu from '../assets/categories/gpu.svg'
import impresora from '../assets/categories/impresora.svg'
import combos from '../assets/categories/kits-actualizacion.svg'
import ram from '../assets/categories/memoria-RAM.svg'
import monitor from '../assets/categories/monitor.svg'
import motherboard from '../assets/categories/motherboard.svg'
import notebook from '../assets/categories/notebook.svg'
import otros from '../assets/categories/otros.svg'
import pcArmada from '../assets/categories/pc-armada.svg'
import perifericos from '../assets/categories/perifericos.svg'
import refrigeracion from '../assets/categories/refrigeracion.svg'
import silla from '../assets/categories/silla-gamer.svg'

const ICON_MAP = {
  'Procesadores': cpu,
  'Placas de Video': gpu,
  'Motherboards': motherboard,
  'Memorias RAM': ram,
  'Almacenamiento': almacenamiento,
  'Fuentes': fuente,
  'Gabinetes': gabinete,
  'Refrigeración': refrigeracion,
  'Pantallas': monitor,
  'Periféricos': perifericos,
  'Notebooks': notebook,
  'PC Armadas': pcArmada,
  'Combos': combos,
  'Sillas Gamer': silla,
  'Consolas de Videojuego': consolas,
  'Impresoras e Insumos': impresora,
  'Otros': otros,
}

const FILTER_VIOLET = 'brightness(0) saturate(100%) invert(72%) sepia(42%) saturate(600%) hue-rotate(210deg) brightness(105%)'

function CategoryIcon({ nombre, size = 30 }) {
  const src = ICON_MAP[nombre] || otros
  return (
    <img
      src={src}
      alt={nombre}
      width={size}
      height={size}
      style={{
        filter: FILTER_VIOLET,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  )
}

export default CategoryIcon