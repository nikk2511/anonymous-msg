import 'next-auth'
import { DefaultSession } from 'next-auth';
import { boolean } from 'zod'


declare module "next-auth" {
    interface Session {
      user: {
        _id: string;
        isVerified: boolean;
        isAcceptingMessages: boolean;
        username: string;
      };
    }
  
    interface User {
      _id: string;
      isVerified: boolean;
      isAcceptingMessages: boolean;
      username: string;
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      _id: string;
      isVerified: boolean;
      isAcceptingMessages: boolean;
      username: string;
    }
  }
  