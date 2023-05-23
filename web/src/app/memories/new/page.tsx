import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewMemory() {
    return (
        <div className="flex flex-1 flex-col gap-4">

            {/* O Link é a forma otimizada do next para navegar entre as paginas do projeto. Mas é equivalente ao <a></a> */}

            <Link href="/" className="flex items-center gap-q text-sm text-gray-200 hover:text-gray-100">

                <ChevronLeft />

                Voltar à timeline
            </Link>

            <form className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-4">

                    {/* Label para a estilizaçao do input file. O input foi pra fora da div pra facilitar na disposiçao dos itens na tela
                    edit: coloquei de folte pq tem esse macete de colocar height e width = 0 */}
                    <label
                        htmlFor="media"
                        className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
                    >
                        <Camera className="h-4 w-4" />
                        Anexar mídia
                    </label>

                    {/* Input utilizado somente para a funçao de upload, porém é estilizado todo na label */}
                    <input type="file" id="media" className="invisible w-0 h-0" />


                    <label
                        htmlFor="isPublic"
                        className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
                    >

                        {/* 
                        O input checkbox também é bem chato de estilizar. por isso instala o plugin @tailwindcss/forms. Ele substitui os elementos padroes pra ser mais facil estilizar 
                        (Tem coisa no tailwind.config) 
                        */}
                        <input
                            type="checkbox"
                            name="isPublic"
                            id="isPublic"
                            value="false"
                            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
                        />
                        Tornar memória pública
                    </label>

                </div>

                <textarea
                    name="content"
                    spellCheck="false"
                    className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                    placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
                />


            </form>






        </div>


    )
}