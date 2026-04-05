import ProtectedRoute from '@/app/Router/ProtectedRoute'
import { OrderManagmentTable } from './(order-managment-component)/order-managment-table'

export default function page() {
  return (
    <ProtectedRoute>
      <div>
        <OrderManagmentTable />
      </div>
    </ProtectedRoute>

  )
}
