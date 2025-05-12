import { Schema, model, models, type Document } from "mongoose"

interface ICourse extends Document {
  title: string
  videoPlaylist: string[] // Array of video URLs
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    videoPlaylist: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
)

// Create a text index on title for better searching
courseSchema.index({ title: "text" })

export default models.Course || model<ICourse>("Course", courseSchema)
