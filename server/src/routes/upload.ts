import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { FastifyInstance } from "fastify";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

/* 
Documentação do proprio modulo.
O pipeline é o jeito de saber quando a stream de dados acaba. Porém ele retorna isso de um jeito nao usando as Promises.
O promisify modifica ele para retornar o processo em forma de Promises, pra poder usar then, catch etc
*/
const pump = promisify(pipeline)


export async function uploadRoutes(app: FastifyInstance) {
    app.post('/upload', async (req, res) => {

        const upload = await req.file({
            limits: {
                fileSize: 5_242_880 /* 5mb. _ nao modifica o numeral */
            }
        })
        //Esse 5mb nao impede o usuario de colocar coisa maior, ele só corta o arquivo no meio. Por exemplo, so upa 5mb da imagem (da pra ajeitar isso dps).

        if (!upload) {
            return res.status(400).send()
        }

        //todo arquivo tem um mimetype. E esse método testa o mimetype de acordo com as condições do regex abaixo
        const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
        const isValidFileFormat = mimeTypeRegex.test(upload.mimetype)

        if (!isValidFileFormat) {
            return res.status(400).send()
        }

        //nome pra salvar no banco. Se salvar com o nome do arquivo, dois arquivos iguais podem dar zebra
        const fileId = randomUUID()
        const extension = extname(upload.filename)

        const fileName = fileId + extension

        /* 
        node File Stream. Nao precisa esperar o arquivo chegar pra gravar no disco. Ele envia o arquivo aos poucos e ja vai salvando. 
        o resolve normaliza o nome das rotas, ja que em cada OS as rotas dos arquivos sao escritas de forma diferente. __dirname é uma variavel global
        do Node que é o local de onde o arquivo atual (no caso upload.ts) está
        */
        const writeStream = createWriteStream(resolve(__dirname, '../../uploads/', fileName)) //onde vai salvar o arquivo

        await pump(upload.file, writeStream)

        const hostUrl = req.protocol.concat('://').concat(req.hostname)

        const fileUrl = new URL(`/uploads/${fileName}`, hostUrl.toString())

        /*  
        Se for acessar o fileUrl vai dar ruim. Isso acontece pq o backend nao deixa as pastas acessiveis pro cliente.
        Por isso que em produçao geralmente se utiliza servicos como amazon S3, Google GCS, Cloudflare R2.
        Para poder acessar esses arquivos aqui nesse projeto, utiliza-se a biblioteca @fastify/static
        */

        return { fileUrl }

    })
}