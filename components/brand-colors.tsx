// Paleta de cores da marca PrecatoIA
export const brandColors = {
  primary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Cor principal
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  secondary: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24", // Cor secundária (dourado)
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
}

// Componente para mostrar a paleta
export function BrandPalette() {
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Paleta de Cores - PrecatoIA</h3>

      <div className="grid gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-3">Azul Primário</h4>
          <div className="flex gap-2">
            {Object.entries(brandColors.primary).map(([shade, color]) => (
              <div key={shade} className="text-center">
                <div className="w-16 h-16 rounded-lg shadow-sm border" style={{ backgroundColor: color }} />
                <p className="text-xs mt-1 font-mono">{shade}</p>
                <p className="text-xs text-gray-500 font-mono">{color}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Dourado Secundário</h4>
          <div className="flex gap-2">
            {Object.entries(brandColors.secondary).map(([shade, color]) => (
              <div key={shade} className="text-center">
                <div className="w-16 h-16 rounded-lg shadow-sm border" style={{ backgroundColor: color }} />
                <p className="text-xs mt-1 font-mono">{shade}</p>
                <p className="text-xs text-gray-500 font-mono">{color}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
