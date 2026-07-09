// src/components/optimizer-header.tsx

import { Moon, Sun } from "lucide-react";

export function OptimizerHeader() {
    return (
        <header className="mx-auto mb-8 flex max-w-6xl items-start justify-between">
            <div>
                <h1 className="text-xl font-medium">EAF Optimizer</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Encontra a mistura de sucata de menor custo para um forno elétrico a arco,
                    respeitando rendimento metálico e composição química.
                </p>
            </div>
            <div className="flex gap-3">
                <a
                    href="https://www.linkedin.com/in/paulo-vinicius-toledo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Perfil no LinkedIn"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Sun className="h-5 w-5" />
                </a>
                <a
                    href="https://github.com/pv-toledo/eaf-optimizer"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Perfil no GitHub"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Moon className="h-5 w-5" />
                </a>
            </div>
        </header>
    );
}