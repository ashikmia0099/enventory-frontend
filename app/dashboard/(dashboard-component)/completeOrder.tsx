import { getfetchPendingOrder } from '@/redux/features/dashboard/completeOrPendingOrder';
import { appDispatch, rootState } from '@/redux/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function CompleteOrder() {

    const dispatch = useDispatch<appDispatch>();
    const { compleate, loading } = useSelector((state: rootState) => state.dahboardPendingOrder);

    useEffect(() => {
        dispatch(getfetchPendingOrder());
    }, [dispatch]);


    return (
        <div className='h-40 border-2 p-10 rounded-2xl flex flex-col justify-center'>
            {loading ? (
                <h2 className='text-center text-lg'>Loading...</h2>
            ) : (
                <>
                    <h2 className='text-3xl font-semibold text-center'>{compleate}</h2>
                    <h2 className='text-lg font-semibold text-center'>Completed Order</h2>
                </>
            )}
        </div>
    )
}

