import { FaGithub, FaLinkedin } from "react-icons/fa6";

export function OptimizerHeader() {
    return (
        <header className="mx-auto mb-8 flex max-w-6xl items-start justify-between">
            <div>
                <h1 className="text-xl font-medium">EAF Optimizer</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Find the lowest-cost scrap mix while meeting strict chemistry and yield targets
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
                    <FaLinkedin className="h-5 w-5" />
                </a>
                <a
                    href="https://github.com/pv-toledo/eaf-optimizer"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Perfil no GitHub"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    <FaGithub className="h-5 w-5" />
                </a>
            </div>
        </header>
    );
}