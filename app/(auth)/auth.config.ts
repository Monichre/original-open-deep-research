import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized( { auth, request: { nextUrl } } ) {
      const isLoggedIn = !!auth?.user
      const isOnRegister = nextUrl.pathname.startsWith( '/register' )
      const isOnLogin = nextUrl.pathname.startsWith( '/login' )

      // Redirect authenticated users away from auth pages
      if ( isLoggedIn && ( isOnLogin || isOnRegister ) ) {
        return Response.redirect( new URL( '/', nextUrl as unknown as URL ) )
      }

      // Allow access to everything
      return true
    },
  },
} satisfies NextAuthConfig;
/*
import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
// import { DrizzleAdapter } from '@auth/drizzle-adapter'
// import { db } from '@/lib/db'

export const authConfig = {
  // adapter: DrizzleAdapter( db ),
  providers: [
    // GitHub( {
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // } ),
    // Google( {
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // } ),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session( { session, token } ) {
      if ( session.user && token.sub ) {
        session.user.id = token.sub
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig


*/