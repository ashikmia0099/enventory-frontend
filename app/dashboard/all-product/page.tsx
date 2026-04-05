import ProtectedRoute from '@/app/Router/ProtectedRoute'
import AllProduct from './(all-product-component)/all-product'
import AllCategory from './(all-product-component)/allCategory'

function page() {
  return (
    <ProtectedRoute>
      <div>
        <AllCategory />
        <AllProduct />
      </div>
    </ProtectedRoute>

  )
}

export default page