// app/api/auth/forgot-password/route.ts
import { connectToDatabase } from '@/lib/models/db';
import User from '@/lib/models/user';
import { NextResponse } from 'next/server';
import { sendOtpEmail } from '../../../../lib/sendOtpEmail';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ message: "Email is required" }, { status: 400 });

    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOtpEmail(user.email, otp);

    return NextResponse.json({ message: "OTP sent to your email" });
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
