import { UserPosition } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    plan?: UserPosition;
    credits?: number;
  }
}
