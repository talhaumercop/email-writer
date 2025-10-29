// filepath: c:\Users\talha\Downloads\email-writer\my-app\app\api/test-session/route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  return NextResponse.json({ session });
}