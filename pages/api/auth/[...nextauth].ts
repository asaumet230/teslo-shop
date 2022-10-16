import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {

    providers: [

        Credentials({

            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@correo.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
            },
            async authorize(credentials) {
                console.log({ credentials })
                return { id: '123456', name: 'juan', email: 'juan@google.com', role: 'ADMINROLE' };
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),

    ],


    // CallBacks:
    callbacks: {
        
    }


}

export default NextAuth(authOptions);