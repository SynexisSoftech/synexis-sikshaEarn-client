import { connectToDatabase } from '@/lib/models/db';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { email, otp, newPassword } = await req.json();
  if (!email || !otp || !newPassword) return NextResponse.json({ message: "Missing fields" }, { status: 400 });

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
  if (user.otp !== otp) return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
  if (user.otpExpires < new Date()) return NextResponse.json({ message: "OTP expired" }, { status: 400 });

  // Hash new password and update the user
  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save();

  return NextResponse.json({ message: "Password successfully reset" });
}
