import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  newEmail?: string; //tem way to store email
  password: string;
  role: 'user' | 'admin';
  emailVerified?: boolean;
  verificationToken?: string;
  otp?: string;
  otpExpires?: Date;
  image?: string;
  blocked?: boolean;
  
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role:      { type: String, enum: ['user', 'admin'], default: 'user' },
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
  newEmail: { type: String }, // for temporary email before OTP verification


  image: { type: String },
  blocked: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
