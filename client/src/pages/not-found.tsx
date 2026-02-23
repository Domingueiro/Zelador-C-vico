import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card shadow-2xl">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 text-destructive items-center">
            <AlertCircle className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-display">404 Page Not Found</h1>
          </div>
          
          <p className="mt-4 text-muted-foreground">
            A rota que você tentou acessar não existe ou foi removida do sistema.
          </p>

          <div className="mt-8 flex justify-end">
            <Link href="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Voltar ao Painel
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
