import ProtectedRoute from '@/app/Router/ProtectedRoute'
import { User } from './(User-Component)/User'

export default function UserPage() {
  return (
    <ProtectedRoute role='ADMIN'>
       <div className=' py-5 px-5'>
        <User/>
    </div>
    </ProtectedRoute>
   
  )
}
