import { Polygon, CircleMarker, Popup, Tooltip } from "react-leaflet";
import { PAVING_WORK_POLYGON, SEWAGE_ISSUES } from "@/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface MapLayersProps {
  showInvestment: boolean;
  showReality: boolean;
}

export function MapLayers({ showInvestment, showReality }: MapLayersProps) {
  const showConflict = showInvestment && showReality;

  return (
    <>
      {/* Investment Layer - Neon Blue Polygon */}
      {showInvestment && (
        <Polygon
          positions={PAVING_WORK_POLYGON}
          pathOptions={{
            color: "#00f9ff",
            fillColor: "#00f9ff",
            fillOpacity: 0.2,
            weight: 3,
            dashArray: "10, 10",
          }}
        >
          <Tooltip sticky direction="top" className="custom-tooltip font-sans font-bold text-primary">
            Obra de Pavimentação<br/>R$ 2.4 Milhões
          </Tooltip>
        </Polygon>
      )}

      {/* Reality Layer - Red Warning Points */}
      {showReality && (
        <>
          {SEWAGE_ISSUES.map((issue) => (
            <CircleMarker
              key={issue.id}
              center={issue.position}
              pathOptions={{
                color: "#ff0000",
                fillColor: "#ff0000",
                fillOpacity: issue.intensity * 0.6,
                weight: 0,
              }}
              radius={20 * issue.intensity}
            >
              <Popup className="font-sans">
                <div className="text-destructive font-bold">Saturação de Esgoto</div>
                <div className="text-xs text-muted-foreground">Risco de contaminação elevado.</div>
              </Popup>
            </CircleMarker>
          ))}
        </>
      )}

      {/* Conflict Alert Overlay */}
      <AnimatePresence>
        {showConflict && (
          <div className="leaflet-bottom leaflet-right !bottom-8 !right-8 !pointer-events-auto z-[1000]">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-destructive/95 backdrop-blur-md border-2 border-destructive text-white p-6 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.4)] max-w-sm animate-pulse-warning"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-full animate-pulse-warning">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display uppercase tracking-wider mb-1">Conflito Detectado</h3>
                  <p className="text-sm font-medium opacity-90 leading-relaxed">
                    Risco de colapso estrutural. A pavimentação proposta ignora a falha crítica na rede de esgoto subjacente.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button className="text-xs bg-white text-destructive font-bold px-3 py-1.5 rounded hover:bg-white/90 transition-colors uppercase tracking-widest">
                      Veto Cidadão
                    </button>
                    <button className="text-xs border border-white/40 hover:bg-white/10 text-white font-bold px-3 py-1.5 rounded transition-colors uppercase tracking-widest">
                      Impugnar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
