import { OptimizationForm } from "@/components/optimization-form";
import { OptimizerHeader } from "@/components/optimizer-header";

export default function Home() {
  return (
    <main className="p-8">
      <OptimizerHeader />
      <OptimizationForm />

    </main>
  );
}
