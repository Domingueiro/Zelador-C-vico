import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapLayers } from "@/components/MapLayers";
import { LayerControls } from "@/components/LayerControls";
import { MoltbookSidebar, MoltbookSheet } from "@/components/MoltbookSidebar";
import { LIMAO_CENTER } from "@/mockData";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [showInvestment, setShowInvestment] = useState(true);
  const [showReality, setShowReality] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      
      {/* Main Map Area */}
      <div className="relative flex-1 h-full z-0">
        
        {/* Controls Overlay */}
        <LayerControls 
          investmentActive={showInvestment}
          realityActive={showReality}
          onToggleInvestment={setShowInvestment}
          onToggleReality={setShowReality}
        />

        {/* Header Overlay */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-card/80 backdrop-blur px-6 py-2 rounded-full border border-border shadow-lg pointer-events-none md:pointer-events-auto">
          <h1 className="font-display font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
            ZELADOR CÍVICO
          </h1>
        </div>

        <MapContainer 
          center={LIMAO_CENTER} 
          zoom={16} 
          style={{ height: "100%", width: "100%", background: '#0f172a' }}
          zoomControl={false}
          className="outline-none"
        >
          {/* Dark Mode Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapLayers 
            showInvestment={showInvestment} 
            showReality={showReality} 
          />
        </MapContainer>
        
        {/* Helper Instructions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-8 z-[900] max-w-xs pointer-events-none"
        >
          <p className="text-white/50 text-xs font-mono bg-black/40 p-2 rounded backdrop-blur-sm border border-white/5">
            Dica: Ative ambas as camadas para visualizar conflitos de planejamento.
          </p>
        </motion.div>
      </div>

      {/* Sidebar - Hidden on mobile, toggled via sheet */}
      <div className="hidden md:block h-full relative z-10 shadow-2xl">
        <MoltbookSidebar />
      </div>

      {/* Mobile Sidebar Toggle */}
      <MoltbookSheet />
    </div>
  );
}
