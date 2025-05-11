import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/models/db';


import Course from '@/lib/models/course';

export async function GET() {
  await connectToDatabase();
  const courses = await Course.find().sort({ title: 1 });
  return NextResponse.json({ courses });
}
