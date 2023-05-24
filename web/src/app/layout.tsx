import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'

import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamJuree } from 'next/font/google'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'
/* Fontes FLEX: nao precisa especificar os weight em que serao importadas. É automatico conforme for usando. As nao flex precisa do weight */
/*  Variable: nome da variavel que o next vai adotar para se referir àquela fonte*/

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamJuree = BaiJamJuree({ subsets: ['latin'], weight: ['700'], variable: '--font-bai-jamjuree' })

/* Importar a fonte dessa forma, ao inves de pelo modo tradicional, evita o problema do Layout Shift (fonte carregando depois de ja ter carregado a pagina) */

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma capsula do tempo construída com React, NextJS, TailwindCSS e TypeScript',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const isAuthenticated = cookies().has('token')

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamJuree.variable} font-sans bg-gray-900 text-gray-100`}>


        <main className="grid grid-cols-2 min-h-screen">
          {/* Left Column */}
          <div className="relative flex flex-col items-start justify-between px-28 py-16 overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">

            {/* Blur */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes " />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />

          </div>

          {/* Right column */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {/* overflow-y-scroll e o max-h-screen é o que faz só a parte do bloco atual (da direita) se mova com o scroll*/}

            {children} {/* Children é onde vai aparecer o conteudo ESPECIFICO de cada página */}

          </div>
        </main>
      </body>
    </html>
  )
}
