import { api } from "@/lib/api";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/* Function/page to receive the exchange code from github */

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url) //search params is the same as query params

    const code = searchParams.get('code')

    try {
        const registerResponse = await api.post('/register', {
            code,
        })

        const { token } = registerResponse.data

        console.log(token)

        const redirectURL = new URL('/', request.url)

        return NextResponse.redirect(redirectURL, {
            headers: {
                'Set-Cookie': `token=${token}; Path=/; max-age=2592000`
            }
        })

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