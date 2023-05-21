import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/* Function/page to receive the exchange code from github */

export async function GET(request: NextRequest) {

    try {

        const redirectURL = new URL('/', request.url)

        return NextResponse.redirect(redirectURL, {
            headers: {
                'Set-Cookie': `token=; Path=/; max-age=0`
            }
        })
        /* Nao existe um "delete-cookie". Pra deslogar, colocamos um novo cookie com duraçao de 0 */




    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error);
            // Do something with this error...
        } else {
            console.error(error);
        }
    }
}