import ProtectedRoute from '@/app/Router/ProtectedRoute'
import AllProductForm from './(all-product-form-component)/all-product-form'

export default function page() {
  return (
    <ProtectedRoute>
      <div>
        <AllProductForm></AllProductForm>
      </div>
    </ProtectedRoute>

  )
}
