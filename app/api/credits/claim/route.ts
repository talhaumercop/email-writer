import { auth } from "@/auth";
import { claimDailyCredits } from "@/lib/credits";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updatedUser = await claimDailyCredits(session.user.id);
  if (!updatedUser) {
    return NextResponse.json(
      { error: "Cannot claim yet" }, 
      { status: 400 }
    );
  }

  return NextResponse.json(updatedUser);
}