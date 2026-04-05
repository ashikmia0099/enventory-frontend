'use client'


import ProtectedRoute from "../Router/ProtectedRoute"
import AllCard from "./(dashboard-component)/allCard"
import { ProductSummaryTable } from "./(dashboard-component)/productSummeryTable"


export default function SidebarPage() {
  return (
    <ProtectedRoute role="ADMIN">
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className=" gap-6">
          <AllCard />
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Product Summary</h2>
          <ProductSummaryTable />
        </div>
      </div>
    </ProtectedRoute>
  )
}