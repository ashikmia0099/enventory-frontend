'use client'
import { FcPackage } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import Link from 'next/link';
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/redux/features/Login/LoginSlice';
import { appDispatch, rootState } from "@/redux/store";

export default function Sidebar() {


    const dispatch = useDispatch<appDispatch>();
    const router = useRouter();
    const user = useSelector((state: rootState) => state.login.user)

    // logout handler

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("auth");
        router.push("/");
    };

    return (
        <div className=' p-2 pt-4 space-y-2'>
            {/* All User */}
            {/* {
                user?.role === "ADMIN" && ( */}
                    <div>
                        <Link href={"/dashboard/Users"}>
                            <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                                <div>
                                    <FaUsers className=' text-3xl text-black' />
                                </div>
                                <div className=''>
                                    <h4 className=' text-[16px] text-black font-semibold'>Users</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                {/* )
            } */}
          
            {/* Dashboard */}
            <div>
                <Link href={"/dashboard"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>Dashboard</h4>
                        </div>
                    </div>
                </Link>
            </div>
            {/* product category */}
            <div>
                <Link href={"/dashboard/category"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>Product Category</h4>
                        </div>
                    </div>
                </Link>
            </div>
            {/* add Product */}
            <div>
                <Link href={"/dashboard/add-product"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>Add Product</h4>
                        </div>
                    </div>
                </Link>
            </div>
            {/* all Product */}
            <div>
                <Link href={"/dashboard/all-product"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>All product</h4>
                        </div>
                    </div>
                </Link>
            </div>
            {/* all order */}
            <div>
                <Link href={"/dashboard/order"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>Add new Order</h4>
                        </div>
                    </div>
                </Link>
            </div>
             {/* order managment */}
            <div>
                <Link href={"/dashboard/order-managment"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>Order Managment</h4>
                        </div>
                    </div>
                </Link>
            </div>
             {/* stock handeling */}
            <div>
                <Link href={"/dashboard/Seleted-Package"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>Stock Handling</h4>
                        </div>
                    </div>
                </Link>
            </div>
             {/* reStock handlening */}
            <div>
                <Link href={"/dashboard/Seleted-Package"}>
                    <div className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5'>
                        <div>
                            <FcPackage className=' text-3xl text-black' />
                        </div>
                        <div className=''>
                            <h4 className=' text-[16px] text-black font-semibold'>Restock Handeling</h4>
                        </div>
                    </div>
                </Link>
            </div>
            {/* logout */}
            <div>
                <div onClick={handleLogout} className=' flex items-center gap-x-2 border border-gray-300 rounded-sm px-1 py-0.5 cursor-pointer'>
                    <div>
                        <AiOutlineLogout className=' text-3xl text-black' />
                    </div>
                    <div className=''>
                        <h4 className=' text-[16px] text-black font-semibold'>Logout</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
