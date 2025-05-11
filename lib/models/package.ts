import mongoose, { Schema, model, models, Document } from 'mongoose';

interface IPackage extends Document {
  category: 'Silver' | 'Gold' | 'Diamond' | 'Heroic';
  price: number;
  description: string;
  features: string[];
  image?: string;
}

const packageSchema = new Schema<IPackage>(
  {
    category: {
      type: String,
      enum: ['Silver', 'Gold', 'Diamond', 'Heroic'],
      required: true,
      unique: true, // Maintain uniqueness
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensure price isn't negative
    },
    description: {
      type: String,
      required: true,
      minlength: 10, // Minimum description length
    },
    features: {
      type: [String],
      required: true,
      validate: {
        validator: (features: string[]) => features.length > 0 && features.every(f => f.trim().length > 0),
        message: 'At least one valid feature is required'
      }
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.Package || model<IPackage>('Package', packageSchema);