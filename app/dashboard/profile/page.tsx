"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const UserProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<{
    firstName?: string
    lastName?: string
    email?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin') // Redirect to sign-in if not authenticated
      return
    }

    if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status, router])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get('/api/user/profile', {
        withCredentials: true // Important for sending cookies
      })

      setProfile({
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email
      })
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch profile')
      console.error('Profile fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-4">Loading profile...</div>
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={fetchProfile}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {profile ? (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">First Name</label>
            <p className="mt-1">{profile.firstName || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Last Name</label>
            <p className="mt-1">{profile.lastName || 'Not provided'}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <p className="mt-1">{profile.email}</p>
          </div>
          {/* <button
            onClick={() => router.push('/profile/edit')}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit Profile
          </button> */}
           <button
            onClick={() => router.push('/dashboard/profile/image')}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
          change Profile
          </button>
           <button
            onClick={() => router.push('/dashboard/profile/change-password')}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
          change Password
          </button>
        </div>
      ) : (
        <p>No profile data found</p>
      )}
    </div>
  )
}

export default UserProfile