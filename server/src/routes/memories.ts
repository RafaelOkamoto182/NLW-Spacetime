import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {

    app.get('/memories', async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        })

        /* The excerpt is just a part of the content. As the memory content wouldn't fit in the main screen anyway (i.e.: figma project), we just return an
        excerpt which will fit. This optmizes the server call. */

        return memories.map((memory) => {
            return ({
                id: memory.id,
                coverUrl: memory.coverUrl,
                exerpt: memory.content.substring(0, 115).concat('...')
            })
        })
    })

    app.get('/memories/:id', async (req) => {

        //default way of getting params
        //const {id} = req.params

        //zod verification
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)

        const memory = prisma.memory.findUniqueOrThrow({
            where: {
                id
            }
        })

        return memory

    })

    app.post('/memories', async (req) => {

        //zod verification
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })

        const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

        const memory = await prisma.memory.create({
            data: {
                content,
                coverUrl,
                isPublic,
                userId: '7fdd5c7d-a2ac-449d-822c-8249a51fa852',
            }
        })

        return memory
    })

    app.put('/memories/:id', async (req) => {
        //zod verification
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false)
        })

        const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

        const memory = await prisma.memory.update({
            where: {
                id,
            },
            data: {
                content,
                coverUrl,
                isPublic
            }
        })

        return memory
    })

    app.delete('/memories/:id', async (req) => {
        //zod verification
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)

        const memory = await prisma.memory.delete({
            where: {
                id
            }
        })
    })




}