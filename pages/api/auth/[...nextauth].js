import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { searchUser } from "../../../controllers/userController";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          const user = await searchUser({
            email: credentials.email,
            password: credentials.password,
          });
          return { name: user.name, email: user.email };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: "a-very-random-key-difficult-to-fetch",
  session: {
    strategy: "jwt",
    maxAge: 100 * 60,
  },
});
