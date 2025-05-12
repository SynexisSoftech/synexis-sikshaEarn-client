import { Schema, model, models, type Document, type Types } from "mongoose"

interface IPackage extends Document {
  category: "Silver" | "Gold" | "Diamond" | "Heroic"
  price: number
  description: string
  courseRefs: Types.ObjectId[]
  image?: string
}

const packageSchema = new Schema<IPackage>(
  {
    category: {
      type: String,
      enum: ["Silver", "Gold", "Diamond", "Heroic"],
      required: true,
      unique: true,
    },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, minlength: 10 },
    courseRefs: {
      type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      required: true,
      validate: {
        validator: (v: any[]) => Array.isArray(v) && v.length > 0,
        message: "At least one course is required",
      },
    },
    image: { type: String },
  },
  { timestamps: true },
)

// Remove any middleware or hooks that might be causing issues
packageSchema.pre("validate", function (next) {
  // Make sure courseRefs is an array with at least one item
  if (!this.courseRefs || !Array.isArray(this.courseRefs) || this.courseRefs.length === 0) {
    this.invalidate("courseRefs", "At least one course is required")
  }
  next()
})

export default models.Package || model<IPackage>("Package", packageSchema)
