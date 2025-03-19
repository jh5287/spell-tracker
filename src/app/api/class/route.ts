import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("spell-tracker");

    const spells = await db.collection("classes").find({}).toArray();

    return NextResponse.json(spells, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}