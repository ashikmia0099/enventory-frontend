import ProtectedRoute from '@/app/Router/ProtectedRoute'
import { DailyOrder } from './(daily-order-component)/daily-order'

export default function page() {
  return (
    <ProtectedRoute>
      <div>
        <DailyOrder></DailyOrder>
      </div>
    </ProtectedRoute>

  )
}
