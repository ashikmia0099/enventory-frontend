"use client"
import Image from 'next/image'
import React from 'react'
import cardimage from "@/public/Images/bannerImage.jpg"
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch, rootState } from '@/redux/store';
import { getfetchProduct } from '@/redux/features/product/productSlice'

export default function AllProduct() {

  const dispatch = useDispatch<appDispatch>();
  const { productData } = useSelector((state: rootState) => state.product);

  React.useEffect(() => {
    dispatch(getfetchProduct());
  }, [dispatch]);


  return (
    <div className=' pt-10 px-10 pb-20'>
      <div className=' space-y-3'>
        <h3 className=' text-2xl text-black font-semibold text-center'>Featured Products</h3>
        <h5 className=' text-lg text-black font-medium text-center'>Check & Get Your Desired Product!</h5>
      </div>
      <div className='grid grid-cols-6 gap-2 mt-10'>
        {
          productData.map((pro) => (
            <div className=' rounded-md border border-gray-500 p-2 flex flex-col' key={pro.id}>
              <div>
                <img src={pro.image} alt={pro.productName} className=' h-32 rounded-md w-full' />
              </div>
              <div className=' py-1.5 pt-5'>
                <h5 className=' text-lg font-bold'>{pro.productName}</h5>
              </div>
              <div className=' flex items-center justify-between'>
                <div className=' flex items-center gap-x-1'>
                  <span>
                    <h5 className=' text-base font-semibold text-black'>Price : </h5>
                  </span>
                  <span>
                    <h5 className=' text-sm font-semibold text-black pt-1'>{pro.price} </h5>
                  </span>
                </div>
                <div className=' flex items-center gap-x-1.5'>
                  <span>
                    <h5 className=' text-base font-semibold text-black'>Stock : </h5>
                  </span>
                  <span>
                    <h5 className=' text-sm font-semibold text-black pt-1'>{pro.stockQuentity} </h5>
                  </span>
                </div>
              </div>
              <div className=' flex items-center justify-between pt-1'>
                <div className=' flex items-center gap-x-1'>
                  <span>
                    <h5 className=' text-sm font-semibold text-black'>Stock Status : </h5>
                  </span>
                  <span>
                    <h5 className=' text-xs font-semibold text-green-600 pt-0.5'>{pro.stockStatus} </h5>
                  </span>
                </div>

              </div>
              
              <div className=' mt-auto pt-5 flex items-center justify-between'>
                <div className=' border-2 '>
                <div className=' grid grid-cols-3 items-center'>
                  <div className=' border-r-2 px-2'>
                    <h5 className=' text-2xl font-bold text-black'>-</h5>
                  </div>
                  <div className=' border-r-2'>
                    <h5 className=' text-xl font-bold text-black text-center'>5</h5>
                  </div>
                  <div>
                    <h5 className=' text-2xl font-bold text-black text-center'>+</h5>
                  </div>
                </div>
              </div>
                <div>
                  <Button className=' w-full'>
                   Card
                </Button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
