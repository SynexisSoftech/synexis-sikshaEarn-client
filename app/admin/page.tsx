// app/admin/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  if (session.user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content */}
    </div>
  )
}