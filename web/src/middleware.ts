import { NextRequest, NextResponse } from "next/server";

const signInURL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`

export function middleware(request: NextRequest) {
    const cookie = request.cookies.get('token')?.value

    /* 
    Se nao tiver o cookie, ele vai mandar pra rota de login e criar um cookie para saber qual pagina o usuario estava tentando acessar. 
    Dai ao final da rota de login, o app poderá ler esse cookie e redirecionar a pessoa pra pagina que ela queria antes.
    Isso é bem legal pq se a pessoa tiver a pagina de criar memoria salva nos favoritos, ela nao vai ser jogada pra home quando o cookie dela expirar
    */
    /* HttpOnmly é pro cookie nao ficar disponivel pras pessoas verem no navegador. Ele fica na camada backend do next ("backend for front end" e aquela historia toda) */

    if (!cookie) {
        return NextResponse.redirect(signInURL, {
            headers: {
                'Set-Cookie': `redirectTo=${request.url}; Path=/;HttpOnly; max-age=20`
            }
        })
    }

    /* Deixa a aplicaçao seguir para onde ela estava indo */
    return NextResponse.next()

}

/* Rotas que serao interceptadas por esse middleware. Tipo um trigger do middleware */
export const config = {
    matcher: '/memories/:path*'
}