import { connectToDatabase } from "@/lib/models/db";
import { Contact } from "../../../lib/models/Contact"; // You need to create this model
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, email, subject, inquiryType, message } = body;

    // Basic validation
    if (!name || !email || !subject || !inquiryType || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Save to DB
    const newContact = new Contact({
      name,
      email,
      subject,
      inquiryType,
      message,
    });

    await newContact.save();

    return NextResponse.json({ message: "Your inquiry has been submitted." }, { status: 200 });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
