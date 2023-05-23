import { EmptyMemory } from '@/components/EmptyMemory'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'


export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    /* movemos tudo que é "constante" nas paginas e deixamos só o que é ESPECIFICO da pagina home. No caso, só o aviso de mempty memories */
    return <EmptyMemory />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`
    },
  })

  const memories = response.data

  return <div>{JSON.stringify(memories)}</div>
}
