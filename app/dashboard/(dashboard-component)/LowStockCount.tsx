import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch, rootState } from "@/redux/store";
import { getfetchRestockCount } from "@/redux/features/dashboard/totalRestockSlice";

export default function LoStockCount() {
  const dispatch = useDispatch<appDispatch>();
  const { restockCount, loading } = useSelector((state: rootState) => state.dashboarrestockCount);

  useEffect(() => {
    dispatch(getfetchRestockCount());
  }, [dispatch]);

  return (
    <div className='h-40 border-2 p-10 rounded-2xl flex flex-col justify-center'>
      {loading ? (
        <h2 className='text-center text-lg'>Loading...</h2>
      ) : (
        <>
          <h2 className='text-3xl font-semibold text-center'>{restockCount}</h2>
          <h2 className=' text-lg font-semibold text-center'>Low Stock Product </h2>
        </>
      )}
    </div>
  );
}


