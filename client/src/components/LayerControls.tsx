import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface LayerControlsProps {
  investmentActive: boolean;
  realityActive: boolean;
  onToggleInvestment: (val: boolean) => void;
  onToggleReality: (val: boolean) => void;
}

export function LayerControls({ 
  investmentActive, 
  realityActive, 
  onToggleInvestment, 
  onToggleReality 
}: LayerControlsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 left-4 z-[1000] bg-card/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-2xl min-w-[280px]"
    >
      <h2 className="text-[10px] font-display font-bold text-muted-foreground uppercase tracking-widest mb-2 border-b border-border pb-1">
        Camadas de Visualização
      </h2>
      
      <div className="space-y-3">
        {/* Investment Toggle */}
        <div className="flex items-center justify-between group">
          <div className="space-y-0.5">
            <Label htmlFor="layer-investment" className="font-bold text-xs text-primary cursor-pointer">
              Investimento Público
            </Label>
            <p className="text-[9px] text-muted-foreground">Obras e orçamento</p>
          </div>
          <Switch 
            id="layer-investment" 
            checked={investmentActive}
            onCheckedChange={onToggleInvestment}
            className="h-4 w-7 data-[state=checked]:bg-primary"
          />
        </div>

        {/* Reality Toggle */}
        <div className="flex items-center justify-between group">
          <div className="space-y-0.5">
            <Label htmlFor="layer-reality" className="font-bold text-xs text-destructive cursor-pointer">
              Realidade do Entorno
            </Label>
            <p className="text-[9px] text-muted-foreground">Esgoto e riscos</p>
          </div>
          <Switch 
            id="layer-reality" 
            checked={realityActive}
            onCheckedChange={onToggleReality}
            className="h-4 w-7 data-[state=checked]:bg-destructive"
          />
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Bairro do Limão</span>
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" style={{ animationDelay: '0.5s' }}></span>
        </div>
      </div>
    </motion.div>
  );
}
