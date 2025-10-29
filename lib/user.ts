import { db } from "@/lib/db";

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({
      where: { email },
      select: { id: true, plan: true },
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
}
