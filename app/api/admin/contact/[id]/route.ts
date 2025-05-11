import { connectToDatabase } from "@/lib/models/db";
import { Contact } from "@/lib/models/Contact";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Contact ID is required." }, { status: 400 });
    }

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Contact not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Contact deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
