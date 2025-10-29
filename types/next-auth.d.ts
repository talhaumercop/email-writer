import { UserPosition } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      plan?: UserPosition;
      credits?: number;
    };
  }
}
