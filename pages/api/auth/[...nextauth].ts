import NextAuth, { Account, Profile, Session, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";

import { checkUserEmailPassword, oAuthToDbUser } from "../../../database";

export const authOptions = {

    providers: [

        Credentials({

            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@correo.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' },
            },
            async authorize(credentials) {

                return await checkUserEmailPassword(credentials?.email!, credentials?.password!);
            }
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),

    ],


    // CallBacks:
    callbacks: {

        async jwt({ token, account, user }: { [x: string]: any }) {

            if (account) {

                token.access_token = account.access_token;

                switch (account.type) {

                    case 'oauth':

                        const dbuser = await oAuthToDbUser(user.email, user.name);
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