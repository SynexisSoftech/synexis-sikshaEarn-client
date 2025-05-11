import mongoose, { Document, Model, Schema } from 'mongoose';

// 1. TypeScript Interface
export interface ContactInformation {
  address: string;
  phone: string[];
  email: string;
  workingHours: {
    sundayToFriday: string;
    saturday: string;
  };
}

// 2. Extend Mongoose Document with the TypeScript interface
interface ContactInformationDocument extends ContactInformation, Document {}

// 3. Define Mongoose Schema
const contactInformationSchema = new Schema<ContactInformationDocument>({
  address: { type: String, required: true },
  phone: { type: [String], required: true },
  email: { type: String, required: true },
  workingHours: {
    sundayToFriday: { type: String, required: true },
    saturday: { type: String, required: true },
  },
});

// 4. Export Mongoose Model
export const ContactModel: Model<ContactInformationDocument> =
  mongoose.models.ContactInformation ||
  mongoose.model<ContactInformationDocument>('ContactInformation', contactInformationSchema);
