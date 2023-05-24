import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {

    /* We use the hook in case we want everything to pass through the verification */
    /* We could just put the jwtVerify on the route to be verified */
    app.addHook('preHandler', async (req) => {
        await req.jwtVerify()
    })

    app.get('/memories', async (req) => {



        const memories = await prisma.memory.findMany({
            where: {
                userId: req.user.sub
            },
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
                excerpt: memory.content.substring(0, 115).concat('...'),
                createdAt: memory.createdAt
            })
        })
    })

    app.get('/memories/:id', async (req, res) => {

        //default way of getting params
        //const {id} = req.params

        //zod verification
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id
            }
        })

        if (!memory.isPublic && memory.userId !== req.user.sub) {
            return res.status(401).send()
        }

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
                userId: req.user.sub,
            }
        })

        return memory
    })

    app.put('/memories/:id', async (req, res) => {
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

        let memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id
            }
        })

        if (!memory.isPublic && memory.userId !== req.user.sub) {
            return res.status(401).send()
        }

        memory = await prisma.memory.update({
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

    app.delete('/memories/:id', async (req, res) => {
        //zod verification
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id
            }
        })

        if (!memory.isPublic && memory.userId !== req.user.sub) {
            return res.status(401).send()
        }

        await prisma.memory.delete({
            where: {
                id
            }
        })
    })

} 