// filepath: c:\Users\talha\Downloads\email-writer\my-app\app\api\user-details\route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import based on your project structure

export async function GET(req: Request) {
  const session = await auth();
  
  // Check if the session is valid and contains the user's email
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch user details from the database
  const user = await db.user.findUnique({
    where: { email: session.user.email },
    select: { plan: true, credits: true },
  });

  // Check if the user exists in the database
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Return the user details
  return NextResponse.json(user);
}