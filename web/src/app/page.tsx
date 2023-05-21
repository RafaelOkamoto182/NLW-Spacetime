import { EmptyMemory } from '@/components/EmptyMemory'


export default function Home() {

  return (
    /* movemos tudo que é "constante" nas paginas e deixamos só o que é ESPECIFICO da pagina home. No caso, só o aviso de mempty memories */
    <EmptyMemory />
  )
}
