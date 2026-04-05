import ProtectedRoute from '@/app/Router/ProtectedRoute'
import { ProduactForm } from './(product-form-component)/product-post-form'

function page() {
  return (
    <ProtectedRoute role='ADMIN'>
      <div>
        <ProduactForm />
      </div>
    </ProtectedRoute>

  )
}

export default page