import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/models/db"
import Course from "@/lib/models/course"

// Add a video to a course
export async function POST(req: NextRequest) {
  await connectToDatabase()

  try {
    const { courseId, videoUrl, videoTitle, videoDescription } = await req.json()

    // Validate inputs
    if (!courseId || !videoUrl) {
      return NextResponse.json({ success: false, error: "Course ID and video URL are required" }, { status: 400 })
    }

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
    }

    // Add the video to the course's videoPlaylist
    course.videoPlaylist.push(videoUrl)
    await course.save()

    return NextResponse.json({
      success: true,
      data: course,
    })
  } catch (err: any) {
    console.error("Error adding video to course:", err)
    return NextResponse.json({ success: false, error: err.message || "Server error" }, { status: 500 })
  }
}

// Remove a video from a course
export async function DELETE(req: NextRequest) {
  await connectToDatabase()

  try {
    const { courseId, videoIndex } = await req.json()

    // Validate inputs
    if (!courseId || videoIndex === undefined) {
      return NextResponse.json({ success: false, error: "Course ID and video index are required" }, { status: 400 })
    }

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
    }

    // Check if the video index is valid
    if (videoIndex < 0 || videoIndex >= course.videoPlaylist.length) {
      return NextResponse.json({ success: false, error: "Invalid video index" }, { status: 400 })
    }

    // Remove the video from the playlist
    course.videoPlaylist.splice(videoIndex, 1)
    await course.save()

    return NextResponse.json({
      success: true,
      data: course,
    })
  } catch (err: any) {
    console.error("Error removing video from course:", err)
    return NextResponse.json({ success: false, error: err.message || "Server error" }, { status: 500 })
  }
}
