import NextAuth from "next-auth";

declare module  "next-auth" {
  interface Session {
    user?: User;
  }

  interface User {
    id?: string | number;
    accessToken?: string;
    refreshToken?: string;
    username?: string;
    super_admin?: boolean;
    first_name?: string;
    last_name?: string;
    role_id?: string;
    email?: string;
    role?: string;
  }
}



