import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { checkUserEmailPassword, oAuthToDbUser } from "../../../database";


export const authOptions = {
    session: {
        maxAge: 2592000, // 30 dias
    },
    providers: [

        Credentials({
            name: 'Custom Login',
            credentials: {
                email: {
                    label: 'Correo:',
                    type: 'email',
                    placeholder: 'correo@correo.com'
                },
                password: {
                    label: 'Contraseña:',
                    type: 'password',
                    placeholder: 'Contraseña'
                },
            },
            async authorize(credentials) {
                const { email = '', password = '' } = credentials as { email: string, password: string }
                return await checkUserEmailPassword(email, password);
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),

    ],

    //* Custom Pages:
    pages: {
        signIn: '/auth/login',
        newRegister: '/auth/register'
    },

    //* CallBacks:
    callbacks: {

        async jwt({ token, account, user }: { [x: string]: any }) {

            if (account) {

                token.access_token = account.access_token;

                switch (account.type) {

                    case 'oauth':

                        const { email = '', name = '' } = user;
                        const dbuser = await oAuthToDbUser(email, name);
                        token.user = dbuser;

                        break;

                    case 'credentials':
                        token.user = user;
                        break;

                }
            }

            return token;
        },

        async session({ session, token }: { [x: string]: any }) {


            session.access_token = token.access_token;
            session.user = token.user;
            return session;
        }

    }


}

export default NextAuth(authOptions);