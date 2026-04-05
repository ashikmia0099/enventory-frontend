import ProtectedRoute from '@/app/Router/ProtectedRoute'
import { OrderTable } from './(order-component)/order-table'

export default function page() {
  return (
    <ProtectedRoute>
      <div>
        <OrderTable />
      </div>
    </ProtectedRoute>

  )
}
