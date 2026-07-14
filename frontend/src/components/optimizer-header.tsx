import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HelpCircle, MousePointerClick, SlidersHorizontal, Target } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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
                <Dialog>
                    <DialogTrigger
                        aria-label="How this works"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <HelpCircle className="h-5 w-5" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>How this works</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                                    <Target className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="pt-1 text-sm text-muted-foreground">
                                    This tool finds the cheapest mix of scrap materials for a furnace
                                    charge, while keeping the final steel within target specs.
                                </p>
                            </div>

                            <div className="-mx-3 flex gap-3 rounded-lg bg-muted/50 px-3 py-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-background">
                                    <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="pt-1 text-sm text-muted-foreground">
                                    The form comes pre-filled with typical values, just click{" "}
                                    <strong className="text-foreground">Optimize charge</strong> to
                                    see a result right away. No setup required.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
                                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="pt-1 text-sm text-muted-foreground">
                                    Want to explore further? Adjust the constraints or the material
                                    list on the left, and optimize again to see how the cost and mix
                                    change.
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <a href="https://www.linkedin.com/in/paulo-vinicius-toledo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Perfil no LinkedIn"
                    className="text-muted-foreground transition-colors hover:text-foreground"><FaLinkedin className="h-5 w-5" /></a>



                <a href="https://github.com/pv-toledo/eaf-optimizer"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Perfil no GitHub"
                    className="text-muted-foreground transition-colors hover:text-foreground">

                    <FaGithub className="h-5 w-5" />
                </a>
            </div>
        </header>
    );
}