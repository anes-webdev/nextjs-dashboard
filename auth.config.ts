import type { NextAuthConfig } from 'next-auth';
// Route protector:
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: { 
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true; // Don't do anything
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // If it isn't in dashboard page, it's login page So,
        // Redirect authenticated users to dashboard after login:
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  // List login options here:
  providers: [],
} satisfies NextAuthConfig;