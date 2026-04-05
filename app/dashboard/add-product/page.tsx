import ProtectedRoute from '@/app/Router/ProtectedRoute'
import { ProductTable } from './(product-compoent)/productTable'
export default function page() {
  return (
    <ProtectedRoute role='ADMIN'>
      <div>
        <ProductTable />
      </div>
    </ProtectedRoute>

  )
}
