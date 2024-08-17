
import NextAuth, { User, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/utils/connect";


export const BASE_PATH = '/api/auth';



const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // Add your providers here
        GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
        callbacks: {
        async session({ session, user }) {
        // Assuming you have user role in your user object
        const userRecord = await prisma.user.findUnique({
            where: { email: user.email },
        });
        session.user.role = userRecord?.role || 'user'; // Add role to session
        return session;
        },
    },
    basePath: BASE_PATH,
    secret: process.env.NEXTAUTH_SECRET,
};

export  const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
