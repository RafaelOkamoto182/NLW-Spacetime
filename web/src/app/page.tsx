import { EmptyMemory } from '@/components/EmptyMemory'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

dayjs.locale(ptBr)

//Para o typescript entender o que tem dentro do objeto memory que sera retornado (Utilizado la no map do final)
interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {

  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return (
      /* movemos tudo que é "constante" nas paginas e deixamos só o que é ESPECIFICO da pagina home. No caso, só o aviso de mempty memories */
      <EmptyMemory />
    )
  }

  const token = cookies().get('token')?.value

  //no next, quando nao estamos em um componente com 'use client', podemos transformar o componente em assincrono e fazer as chamadas direto dele, sem precisar de estados etc
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemory />
  }

  return (
    <div className='flex flex-col gap-10 p-8'>

      {memories.map((memory) => {
        return (
          <div key={memory.id} className='space-y-4'>
            <time className='-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50'>
              {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
            </time>
            <Image src={memory.coverUrl} width={592} height={280} alt=''
              className='aspect-video w-full rounded-lg object-cover'
            />
            <p className='text-lg leading-relaxed text-gray-100'>{memory.excerpt}</p>

            <Link href={`/memories/${memory.id}`} className='flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100'>
              Ler mais
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>
        )
      })}

    </div>
  )

}
