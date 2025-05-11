import { connectToDatabase } from "@/lib/models/db";
import { Contact } from "@/lib/models/Contact";
import { NextResponse } from "next/server";

// GET: Fetch all contact messages
export async function GET() {
  try {
    await connectToDatabase();

    const contacts = await Contact.find().sort({ createdAt: -1 }); // newest first
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

