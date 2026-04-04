'use client'
import { getfetchCategory } from '@/redux/features/category/categorySlice';
import { appDispatch, rootState } from '@/redux/store';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function AllCategory() {

    const dispatch = useDispatch<appDispatch>();
    const { categoryData } = useSelector((state: rootState) => state.category);

    useEffect(() => {
        dispatch(getfetchCategory())
    }, [dispatch])

    return (
        <div className=' pt-10 px-10 border-b-2 pb-10 mx-5'>
            <div className=' space-y-3'>
                <h3 className=' text-2xl text-black font-semibold text-center'>Featured Category</h3>
                <h5 className=' text-lg text-black font-medium text-center'>Get Your Desired Product from Featured Category!</h5>
            </div>
            <div className='grid grid-cols-10 gap-2 mt-10'>
                {
                    categoryData.map((cat : any) => (
                        <div className=' h-20 rounded-md border border-gray-500 flex items-center justify-center p-2' key={cat.id}>
                            <h3 className=' text-lg font-semibold text-center leading-5'>{cat.categoryName}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
