export function Logo({ size = "large" }: { size?: "small" | "medium" | "large" }) {
  const dimensions = {
    small: { width: 180, height: 60 },
    medium: { width: 280, height: 95 },
    large: { width: 380, height: 130 },
  }

  const { width, height } = dimensions[size]

  return (
    <div className="flex items-center justify-center group p-8 -m-8">
      <svg
        width={width}
        height={height}
        viewBox="0 0 380 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-500 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="50%" stopColor="#374151" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>
          <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="25%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="75%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
        </defs>

        {/* Modern Bot Icon - Sem efeitos de brilho */}
        <g transform="translate(30, 35)">
          {/* Main bot head shape */}
          <rect
            x="15"
            y="10"
            width="50"
            height="45"
            rx="8"
            fill="url(#botGradient)"
            className="opacity-90 transition-all duration-300 group-hover:opacity-100"
          />

          {/* Bot eyes with subtle animation */}
          <circle 
            cx="27" 
            cy="27" 
            r="4" 
            fill="#ffffff" 
            className="opacity-90 animate-pulse" 
            style={{ animationDelay: '0s', animationDuration: '3s' }}
          />
          <circle 
            cx="53" 
            cy="27" 
            r="4" 
            fill="#ffffff" 
            className="opacity-90 animate-pulse" 
            style={{ animationDelay: '1.5s', animationDuration: '3s' }}
          />

          {/* Bot eye pupils */}
          <circle cx="27" cy="27" r="2" fill="#1e40af" />
          <circle cx="53" cy="27" r="2" fill="#1e40af" />

          {/* Bot mouth/display */}
          <rect
            x="30"
            y="37"
            width="20"
            height="8"
            rx="2"
            fill="#ffffff"
            className="opacity-80"
          />

          {/* Bot antenna - sem filtros */}
          <line 
            x1="40" 
            y1="10" 
            x2="40" 
            y2="0" 
            stroke="url(#botGradient)" 
            strokeWidth="3" 
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          <circle cx="40" cy="0" r="3" fill="url(#botGradient)" className="animate-pulse" style={{ animationDuration: '4s' }} />

          {/* Bot status indicators - animação mais suave */}
          <circle cx="20" cy="20" r="2" fill="#10b981" className="animate-pulse" style={{ animationDuration: '2s' }} />
          <circle cx="60" cy="20" r="2" fill="#3b82f6" className="animate-pulse" style={{ animationDelay: '1s', animationDuration: '2s' }} />
        </g>

        {/* Modern typography - Sem filtros */}
        <g transform="translate(110, 40)">
          {/* PRECABOT sem efeitos */}
          <text
            x="0"
            y="25"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="42"
            fontWeight="900"
            fill="url(#primaryGradient)"
            letterSpacing="-1.5px"
            className="transition-all duration-300 group-hover:scale-105"
          >
            PRECABOT
          </text>

          {/* Modern tagline */}
          <text
            x="0"
            y="50"
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="14"
            fontWeight="600"
            fill="#374151"
            letterSpacing="3px"
            className="transition-all duration-300 group-hover:text-gray-800"
          >
            INTELIGÊNCIA JURÍDICA
          </text>
        </g>

        {/* Decorative elements com animação mais suave */}
        <g className="opacity-40 animate-spin" style={{ animationDuration: '30s' }}>
          <circle cx="320" cy="20" r="4" fill="url(#primaryGradient)" />
          <circle cx="340" cy="110" r="3" fill="url(#accentGradient)" />
          <circle cx="30" cy="110" r="3.5" fill="url(#botGradient)" />
          <circle cx="300" cy="120" r="2" fill="url(#primaryGradient)" />
          <circle cx="50" cy="10" r="2.5" fill="url(#accentGradient)" />
        </g>

        {/* Circuit pattern background */}
        <g className="opacity-10">
          <path d="M10 80 L50 80 L50 90 L90 90" stroke="url(#primaryGradient)" strokeWidth="1" />
          <path d="M300 40 L340 40 L340 50 L380 50" stroke="url(#accentGradient)" strokeWidth="1" />
          <path d="M10 100 L30 100 L30 110 L50 110" stroke="url(#botGradient)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  )
}

export function LogoCompact() {
  return (
    <div className="flex items-center gap-3 group p-4 -m-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            {/* Bot head */}
            <rect x="4" y="6" width="16" height="12" rx="3" fill="white" className="opacity-90" />
            {/* Bot eyes */}
            <circle cx="8" cy="10" r="1.5" fill="#1e40af" />
            <circle cx="16" cy="10" r="1.5" fill="#1e40af" />
            {/* Bot mouth */}
            <rect x="9" y="13" width="6" height="2" rx="1" fill="#1e40af" />
            {/* Bot antenna */}
            <line x1="12" y1="6" x2="12" y2="3" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="3" r="1" fill="white" />
          </svg>
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-blue-600 transition-all duration-300 group-hover:scale-105">
          PRECABOT
        </span>
      </div>
    </div>
  )
}
