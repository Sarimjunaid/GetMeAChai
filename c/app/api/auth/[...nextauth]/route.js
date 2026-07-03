import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDB'
// // import AppleProvider from 'next-auth/providers/apple'
// // import FacebookProvider from 'next-auth/providers/facebook'
// // import EmailProvider from 'next-auth/providers/email'
// // import GitHubProvider from "next-auth/providers/github"



export const authoptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         if(account.provider =="google") { 
          await connectDB()
          // Check if the user already exists in the database
          const currentUser =  await User.findOne({email: email}) 
          if(!currentUser){
            // Create a new user
             const newUser = await User.create({
              email: user.email, 
              username: user.email.split("@")[0], 
            })   
          } 
          return true
         }
      },
      
      async session({ session, user, token }) {
        const dbUser = await User.findOne({email: session.user.email})
        session.user.name = dbUser.username
        return session
      },
    } 
  })

export { authoptions as GET, authoptions as POST }
//     // OAuth authentication providers...
//   //   GitHubProvider({
//   //   clientId: process.env.GITHUB_ID,
//   //   clientSecret: process.env.GITHUB_SECRET
//   // }),

//     // AppleProvider({
//     //   clientId: process.env.APPLE_ID,
//     //   clientSecret: process.env.APPLE_SECRET
//     // }),
//     // FacebookProvider({
//     //   clientId: process.env.FACEBOOK_ID,
//     //   clientSecret: process.env.FACEBOOK_SECRET
//     // }),
//     // // Passwordless / email sign in
//     // EmailProvider({
//     //   server: process.env.MAIL_SERVER,
//     //   from: 'NextAuth.js <no-reply@example.com>'
//     // }),


