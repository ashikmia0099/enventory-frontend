import React from 'react'
import { CategoryForm } from './(category-form-component)/category-post-form'
import ProtectedRoute from '@/app/Router/ProtectedRoute'

function page() {
  return (
    <ProtectedRoute role='ADMIN'>
    <div>
        <CategoryForm/>
    </div>
    </ProtectedRoute>

  )
}

export default page