import React from 'react'
import LoStockCount from './LowStockCount'
import TotalOrderToday from './TodayTotalOrder'
import PendingOrder from './pendingOrder'
import CompleteOrder from './completeOrder'

export default function AllCard() {
    return (
        <div className=' grid grid-cols-3  mx-5 mt-10 gap-4 '>
            <TotalOrderToday />
            <LoStockCount />
            <PendingOrder />
            <CompleteOrder />
        </div>
    )
}
