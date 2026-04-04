import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch, rootState } from "@/redux/store";
import { getfetchtoDayOrder } from "@/redux/features/dashboard/toDayorderSlice";

export default function TotalOrderToday() {
    const dispatch = useDispatch<appDispatch>();
    const { orderData, loading } = useSelector((state: rootState) => state.dahboardToDayOrder);

    useEffect(() => {
        dispatch(getfetchtoDayOrder());
    }, [dispatch]);

    return (
        <div className='h-40 border-2 p-10 rounded-2xl flex flex-col justify-center'>
            {loading ? (
                <h2 className='text-center text-lg'>Loading...</h2>
            ) : (
                <>
                    <h2 className='text-3xl font-semibold text-center'>{orderData}</h2>
                    <h2 className='text-lg font-semibold text-center'>Total Orders Today</h2>
                </>
            )}
        </div>
    );
}