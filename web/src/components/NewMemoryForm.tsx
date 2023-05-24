'use client'

import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { api } from "@/lib/api";
import { FormEvent } from "react";
import Cookie from 'js-cookie'
import { useRouter } from "next/navigation";


export function NewMemoryForm() {

    //const cookie = cookies.has('token') Essa funcao nao pode ser usada dentro de 'use client'. Ela é uma funçao feita na camada do BFF (backend for frontend)
    //como o 'use client' exclui essa camada, precisa acessar os cookies de um jeito diferente.
    //nos casos de 'use client'utiliza-se um metodo global document.cookie. O unico chato desse metodo é que tem que dar uma manipulada nas strings com regex.
    //Aqui utilizou a lib js-cookie, que facilita manipular cookies no geral

    const router = useRouter()


    async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {

        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        console.log(Array.from(formData.entries()))

        const fileToUpload = formData.get('coverUrl')

        let coverUrl = ''

        //enviando o arquivo pra rota do backend
        if (fileToUpload) {
            const uploadFormData = new FormData()  //Cria um objeto no formado de multipart-form-data, que é o formato que selecionamos pra upload no backend (por causa de arquivos)
            uploadFormData.set('file', fileToUpload)

            const uploadResponse = await api.post('/upload', uploadFormData)

            coverUrl = uploadResponse.data.fileUrl
        }

        const token = Cookie.get('token')

        await api.post(
            '/memories',
            {
                coverUrl,
                content: formData.get('content'),
                isPublic: formData.get('isPublic'),
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )

        router.push('/')
    }


    return (
        <form
            onSubmit={handleCreateMemory}
            className="flex flex-1 flex-col gap-2"
        >
            <div className="flex items-center gap-4">

                {/* 
                    Label para a estilizaçao do input file. O input foi pra fora da div pra facilitar na disposiçao dos itens na tela
                    edit: coloquei de folte pq tem esse macete de colocar height e width = 0 
                    edit: input foi pro mediaPicker e fora da div msm pq volta a dar ruim no espaçamento           
                    */}

                <label
                    htmlFor="media"
                    className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
                >
                    <Camera className="h-4 w-4" />
                    Anexar mídia
                </label>

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

            <MediaPicker />

            <textarea
                name="content"
                spellCheck="false"
                className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
            />

            <button
                type="submit"
                className='inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600 self-end'
            >
                Salvar
            </button>

        </form>
    )
}