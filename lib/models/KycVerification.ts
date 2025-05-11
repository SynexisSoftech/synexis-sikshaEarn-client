import mongoose, { Schema, Document } from 'mongoose';

export interface IKycVerification extends Document {
  userId: mongoose.Types.ObjectId; // reference to the User
  fullName: string;
  dateOfBirth: Date;
  nationality: string;
  gender: 'Male' | 'Female' | 'Other';
  fullAddress: string;
  idType: string;
  idNumber: string;
  idFront: string; // file path or URL
  idBack: string;  // file path or URL
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewerComment?: string;
}

const KycVerificationSchema = new Schema<IKycVerification>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  fullAddress: { type: String, required: true },

  idType: { type: String, required: true },
  idNumber: { type: String, required: true },
  idFront: { type: String, required: true }, // store file path or cloud URL
  idBack: { type: String, required: true },

  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  reviewerComment: { type: String },
});

export default mongoose.models.KycVerification || mongoose.model<IKycVerification>('KycVerification', KycVerificationSchema);
