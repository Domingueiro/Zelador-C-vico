// Simulating data locally for the visual PoC as requested by the user,
// while the backend structure is ready for real persistence.

import { LatLngExpression } from "leaflet";

export const LIMAO_CENTER: LatLngExpression = [-23.5097, -46.6669];

// Polygon for the "Investment" layer (Neon Blue)
// Covering a block in Bairro do Limão
export const PAVING_WORK_POLYGON: LatLngExpression[] = [
  [-23.5085, -46.6680],
  [-23.5085, -46.6655],
  [-23.5110, -46.6655],
  [-23.5110, -46.6680],
];

// Points for "Reality" layer (Red Heatmap/Points)
// Overlapping significantly with the paving work
export const SEWAGE_ISSUES: { id: number; position: LatLngExpression; intensity: number }[] = [
  { id: 1, position: [-23.5095, -46.6665], intensity: 0.9 }, // Critical center
  { id: 2, position: [-23.5092, -46.6660], intensity: 0.8 },
  { id: 3, position: [-23.5100, -46.6670], intensity: 0.7 },
  { id: 4, position: [-23.5088, -46.6675], intensity: 0.6 },
  { id: 5, position: [-23.5105, -46.6658], intensity: 0.8 },
];

export const MOCK_FINANCIAL_DATA = [
  {
    name: "Arrecadação",
    value: 12500000,
    fill: "#10b981", // Emerald
  },
  {
    name: "Investimento",
    value: 2400000,
    fill: "#0ea5e9", // Sky Blue
  },
  {
    name: "Emendas Ocultas",
    value: 5600000,
    fill: "#6366f1", // Indigo (Dashed/Pattern in chart config)
  },
];
