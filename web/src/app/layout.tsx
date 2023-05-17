import './globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamJuree } from 'next/font/google'
/* Fontes FLEX: nao precisa especificar os weight em que serao importadas. É automatico conforme for usando. As nao flex precisa do weight */
/*  Variable: nome da variavel que o next vai adotar para se referir àquela fonte*/

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamJuree = BaiJamJuree({ subsets: ['latin'], weight: ['700'], variable: '--font-bai-jamjuree' })

/* Importar a fonte dessa forma, ao inves de pelo modo tradicional, evita o problema do Layour Shift (fonte carregando depois de ja ter carregado a pagina) */

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma capsula do tempo construída com React, NextJS, TailwindCSS e TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${baiJamJuree.variable} font-sans bg-gray-900 text-gray-100`}>{children}</body>
    </html>
  )
}
