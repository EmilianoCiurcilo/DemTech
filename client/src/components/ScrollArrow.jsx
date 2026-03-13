function ScrollArrow({ direction, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all border border-white/10 text-gray-500 hover:text-white hover:border-violet-500/60 hover:bg-violet-500/10 ${className}`}
      style={{ background: 'rgba(255,255,255,0.03)' }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {direction === 'left'
          ? <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        }
      </svg>
    </button>
  )
}

export default ScrollArrow