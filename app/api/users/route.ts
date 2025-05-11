import { connectToDatabase } from '../../../lib/models/db';
import User from '../../../lib/models/user';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/sendEmail';
import crypto from 'crypto';

// GET /api/users - fetch all users, or by email or id
export async function POST(req: Request) {
    const { userId, oldPassword, newPassword } = await req.json();
  
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) return new Response('User not found', { status: 404 });
  
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return new Response('Old password is incorrect', { status: 400 });
  
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  
    return new Response(JSON.stringify({ message: 'Password updated successfully' }), { status: 200 });
  }
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');

    let user;

    if (email) {
      user = await User.findOne({ email }).select('-password');
    } else if (id) {
      user = await User.findById(id).select('-password');
    } else {
      const users = await User.find().select('-password');
      return new Response(JSON.stringify(users), { status: 200 });
    }

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response('Error fetching user(s)', { status: 500 });
  }
}

// PATCH /api/users - toggle blocked status of a user
export async function PATCH(req: Request) {
    const { userId, firstName, lastName, image } = await req.json();
  
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) return new Response('User not found', { status: 404 });
  
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.image = image ?? user.image;
    await user.save();
  
    return new Response(JSON.stringify({ message: 'Profile updated' }), { status: 200 });
  }
// DELETE /api/users - delete a user
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { userId } = await req.json();

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response('Error deleting user', { status: 500 });
  }
}
