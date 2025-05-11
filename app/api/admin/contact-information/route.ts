// app/api/contact-information/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/models/db';
import { ContactModel } from '@/lib/models/contact-information';

export async function GET() {
  await connectToDatabase();
  const contacts = await ContactModel.find().lean();
  return NextResponse.json({ success: true, data: contacts });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();

    const existing = await ContactModel.findOne();

    if (existing) {
      const updated = await ContactModel.findByIdAndUpdate(existing._id, body, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }

    const created = await ContactModel.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save contact' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing contact ID' }, { status: 400 });
    }

    await connectToDatabase();

    const updatedContact = await ContactModel.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();

    if (!updatedContact) {
      return NextResponse.json({ success: false, error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedContact });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update contact' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing contact ID' }, { status: 400 });
    }

    await connectToDatabase();

    const deletedContact = await ContactModel.findByIdAndDelete(id).lean();

    if (!deletedContact) {
      return NextResponse.json({ success: false, error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedContact });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete contact' }, { status: 400 });
  }
}