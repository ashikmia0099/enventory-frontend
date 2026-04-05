import ProtectedRoute from '@/app/Router/ProtectedRoute'
import { CategoryTable } from './(category-component)/categoryTable'
export default function page() {
  return (
    <ProtectedRoute role='ADMIN'>
      <div>
        <CategoryTable />
      </div>
    </ProtectedRoute>

  )
}
