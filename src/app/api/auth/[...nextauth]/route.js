import { User } from "@/models/User";
import mongoose from "mongoose";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { useSession } from "next-auth/react";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "text@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        await mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        if (passwordOk) {
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
