import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import jwt from 'jsonwebtoken';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.JWT_SECRET,
  // callbacks: {
  //   async jwt({ token }) {
  //     console.log('ini token', token);
  //     const signed = jwt.sign(token, process.env.JWT_SECRET as string, {
  //       algorithm: 'HS256',
  //     });
  //     console.log(signed);
  //     return signed as any;
  //   },
  // },
});
