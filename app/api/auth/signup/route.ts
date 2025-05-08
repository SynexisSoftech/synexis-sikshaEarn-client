import { connectToDatabase } from '../../../../lib/models/db';
import User from '../../../../lib/models/user';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/sendEmail';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response('User already exists', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
    });

    await sendVerificationEmail(user.email, verificationToken);

    return new Response(JSON.stringify({ message: 'User created. Check your email to verify.' }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response('Signup error', { status: 500 });
  }
}
