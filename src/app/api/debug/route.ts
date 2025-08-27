import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL || "undefined",
    POSTGRES_URL: process.env.POSTGRES_URL || "undefined",
    NODE_ENV: process.env.NODE_ENV,
  });
}