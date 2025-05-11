import { NextRequest, NextResponse } from 'next/server';
import  {auth}  from '../../../lib/auth'; // <-- use `auth()` from your NextAuth setup
import { connectToDatabase } from '@/lib/models/db';
import KycVerification from '@/lib/models/KycVerification';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const session = await auth(); // ✅ this replaces getServerSession()

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();

  const fullName = formData.get('fullName') as string;
  const dateOfBirth = new Date(formData.get('dateOfBirth') as string);
  const nationality = formData.get('nationality') as string;
  const gender = formData.get('gender') as string;
  const fullAddress = formData.get('fullAddress') as string;
  const idType = formData.get('idType') as string;
  const idNumber = formData.get('idNumber') as string;
  const idFront = formData.get('idFront') as File;
  const idBack = formData.get('idBack') as File;

  await connectToDatabase();

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const frontBuffer = Buffer.from(await idFront.arrayBuffer());
  const backBuffer = Buffer.from(await idBack.arrayBuffer());

  const timestamp = Date.now();
  const frontPath = path.join(uploadsDir, `${timestamp}-front-${idFront.name}`);
  const backPath = path.join(uploadsDir, `${timestamp}-back-${idBack.name}`);

  await writeFile(frontPath, frontBuffer);
  await writeFile(backPath, backBuffer);

  const kyc = new KycVerification({
    userId: session.user.id,
    fullName,
    dateOfBirth,
    nationality,
    gender,
    fullAddress,
    idType,
    idNumber,
    idFront: `/uploads/${path.basename(frontPath)}`,
    idBack: `/uploads/${path.basename(backPath)}`,
    status: 'pending',
    submittedAt: new Date(),
  });

  await kyc.save();

  return NextResponse.json({ message: 'KYC submitted successfully' }, { status: 201 });
}
