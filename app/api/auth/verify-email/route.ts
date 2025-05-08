import { connectToDatabase } from '../../../../lib/models/db';
import User from '../../../../lib/models/user';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return new NextResponse('Missing token', { status: 400 });
  }

  await connectToDatabase();

  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return new NextResponse('Invalid or expired token', { status: 400 });
  }

  user.emailVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // ✅ Redirect to login page with query param
  return NextResponse.redirect(new URL('/login?verified=1', req.url));
}
