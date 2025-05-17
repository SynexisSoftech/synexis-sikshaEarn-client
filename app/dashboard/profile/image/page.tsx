import ProfileImageUpload from './ProfileImageUpload'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/signin')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Your Profile</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ProfileImageUpload />
        </div>
        {/* Other profile fields would go here */}
      </div>
    </div>
  )
}