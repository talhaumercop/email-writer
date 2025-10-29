import { db } from "@/lib/db";

export async function checkAndRefreshCredits(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return null;

  const now = new Date();
  const lastUpdate = new Date(user.lastCreditUpdate);

  // Determine reset window based on plan
  const resetInterval = user.plan === "PRO" ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 days vs 24h
  const creditCap = user.plan === "PRO" ? 100 : 10;

  if (now.getTime() - lastUpdate.getTime() > resetInterval) {
    // Reset credits to full
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        credits: creditCap,
        lastCreditUpdate: now,
      },
    });
    return updatedUser;
  }

  // No reset needed → return same user
  return user;
}
