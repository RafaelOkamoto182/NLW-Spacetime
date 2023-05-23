import { NewMemoryForm } from "@/components/NewMemoryForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-16">

            {/* O Link é a forma otimizada do next para navegar entre as paginas do projeto. Mas é equivalente ao <a></a> */}

            <Link href="/" className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100">

                <ChevronLeft className="h-4 w-4" />

                Voltar à timeline
            </Link>

            <NewMemoryForm />

        </div>
    )
}