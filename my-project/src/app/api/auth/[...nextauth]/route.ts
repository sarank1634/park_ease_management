import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/poviders/google";
import {PrismaAdapter} from  "next-auth/prisma-adapter";
import {prisma} from "../../../../libray/prisma";
import {compare} from "bcrypt";
import { adapter } from "next/dist/server/web/adapter";
import { emitWarning } from "process";
import { Session } from "inspector/promises";

const handler = NextAuth ({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            ClientSecret : process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                }
                async authorize(credentials) {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials?.email},
                    });

                    if(!user && user.password && credentials?.password) {
                        const isVaild = await compare(credentials.password, user.password);
                        if(isVaild) return user;
                    }
                    return null;
                },
        }),
    ],
    session: {
        strategy: "jwt",
    },
})
 
export {handler as GET, handler as POST};