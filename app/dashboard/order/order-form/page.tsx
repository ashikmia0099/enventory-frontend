import ProtectedRoute from '@/app/Router/ProtectedRoute'
import { OrderForm } from './(order-form-compoent)/order-form'

export default function page() {
  return (
    <ProtectedRoute>
 <div>
        <OrderForm/>
    </div>
    </ProtectedRoute>
   
  )
}
