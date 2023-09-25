import NextAuth from "next-auth"
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import prisma from '@/lib/prisma';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      // sendVerificationRequest({
      //   identifier: email,
      //   url,
      //   provider: {server, from},
      // }) {
      //   /* your function */
      // },
    }),
  ],
  callbacks: {
    // async signIn({user, account, email}) {
      // await db.connect();
      // const userExists = await User.findOne({
      //   email: user.email, //the user object has an email property, which contains the email the user entered.
      // });
      // if (userExists) {
      //   return true; //if the email exists in the User collection, email them a magic login link
      // } else {
      //   return '/register';
      // }
    // },
  },
});

export { handler as GET, handler as POST }
