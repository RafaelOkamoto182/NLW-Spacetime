import { cookies } from 'next/headers'
import decode from 'jwt-decode'

interface User {
    sub: string,
    name: string,
    avatarUrl: string
}

export function getUser(): User {
    const token = cookies().get('token')?.value  /* a interrogaçao vem automatico. É pq o value pode nao existir, por isso o JS coloca esse ponto. */

    if (!token) {
        throw new Error('Unauthenticated')
    }

    const user: User = decode(token)

    return user
}