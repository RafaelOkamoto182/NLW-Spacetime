'use client'

import { ChangeEvent, useState } from "react"

/*
    Atualmente, o jeito mais recomendado de usar o ReactJS é com um framework: o framework tem uma camada que vai trabalhar para
    NAO enviar Javascript desnecessario pro navegador (que é o mais pesado de processar). 
    Por isso, os componentes que necessitam de reatividade (que precisa dar listen em algo etc, e só funcionam com JS) só podem ser usados no react 
    quando se coloca o 'use client' no inicio do componente. Isso faz com que o next ignore essa camada e manda todo o JS pro navegador.
    Porém, para continuar enviando o minimo necessario, cria o componente e só usa o 'use client'nesse componente que precisa de tal funçao.
    No caso aqui, a funçao onChange
*/

export function MediaPicker() {
    //useState: com essa propriedade, toda vez que uma variavel mude seu valor, consegue exeibir algo na tela baseado nesse valor
    const [preview, setPreview] = useState<string | null>(null)

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target

        if (!files) {
            return
        }

        const previewURL = URL.createObjectURL(files[0])

        setPreview(previewURL)

    }

    return (
        //Input utilizado somente para a funçao de upload, porém é estilizado todo na label
        //A div altera um pouco o espaçamento das coisas. Esse <> </> nao altera nada no html. Chamado de 'fragment'
        <>
            <input
                onChange={onFileSelected}
                name="coverUrl"
                type="file"
                id="media"
                accept="image/*"
                className="invisible w-0 h-0"
            />
            {/* /poderia colocar video/* tambem, mas dai teria que colocar um <video> ao invez do <img>. N fez pra economizar tempo */}


            {/* O && é uma forma de if só que sem o else. Se o valor for verdadeiro, ele vai fazer o que vem em seguida. Senao so pula */}
            {preview && <img src={preview} alt="" className="rounded-lg w-full aspect-video object-cover" />}

        </>
    )
}