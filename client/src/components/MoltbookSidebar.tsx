import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MOCK_FINANCIAL_DATA } from '@/mockData';
import { Shield, TrendingUp, AlertCircle, FileText, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function MoltbookSidebar() {
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', notation: "compact" }).format(value);

  return (
    <div className="h-full bg-card border-l border-border flex flex-col w-full md:w-[400px]">
      <div className="p-6 border-b border-border bg-card/50 backdrop-blur">
        <h2 className="text-2xl font-display font-bold text-primary flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Moltbook
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Painel de Transparência Cívica</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Financial Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Fluxo Financeiro
            </h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20">
              Ao Vivo
            </span>
          </div>
          
          <div className="h-[250px] w-full bg-background/50 rounded-xl border border-border/50 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_FINANCIAL_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  tick={{ fill: '#94a3b8', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                  formatter={(value: number) => [formatCurrency(value), 'Valor']}
                  cursor={{fill: 'transparent'}}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {MOCK_FINANCIAL_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.fill} 
                      stroke={entry.name === 'Emendas Ocultas' ? '#a5b4fc' : 'none'}
                      strokeDasharray={entry.name === 'Emendas Ocultas' ? '4 4' : '0'}
                      strokeWidth={entry.name === 'Emendas Ocultas' ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground italic">
            * Emendas Ocultas representam valores não discriminados no portal da transparência oficial.
          </p>
        </section>

        {/* Alerts Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            Alertas Recentes
          </h3>
          
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 rounded-lg bg-background/30 border border-border hover:border-primary/50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-muted-foreground">Protocolo #{2024000 + i}</span>
                  <span className="text-[10px] uppercase tracking-wider text-destructive font-bold bg-destructive/10 px-2 py-0.5 rounded">
                    Crítico
                  </span>
                </div>
                <h4 className="font-medium text-sm text-foreground mb-1 group-hover:text-primary transition-colors">
                  Incompatibilidade de Solo
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Relatório geotécnico indica lençol freático superficial na área da nova praça.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent-foreground" />
            Documentos Públicos
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['Plano Diretor', 'LOA 2024', 'Mapa de Riscos', 'Licitações'].map((doc) => (
              <Button key={doc} variant="outline" className="h-auto py-3 text-xs justify-start border-border/50 hover:bg-accent hover:text-accent-foreground">
                {doc}
              </Button>
            ))}
          </div>
        </section>

      </div>
      
      <div className="p-4 border-t border-border bg-card/50">
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold tracking-wide">
          NOVA DENÚNCIA
        </Button>
      </div>
    </div>
  );
}

// Mobile Responsive Wrapper
export function MoltbookSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4 z-[9999] md:hidden bg-background/80 backdrop-blur border-primary/50 text-primary">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-0 w-[85vw] sm:w-[400px] border-l border-border bg-card">
        <MoltbookSidebar />
      </SheetContent>
    </Sheet>
  );
}
