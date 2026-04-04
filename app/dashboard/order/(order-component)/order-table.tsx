'use client'
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getfetchOrder } from "@/redux/features/order/orderSlice";
import { appDispatch, rootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function OrderTable() {


    const dispatch = useDispatch<appDispatch>();
    const { orderData } = useSelector((state: rootState) => state.order);


    useEffect(() => {
        dispatch(getfetchOrder())
    }, [dispatch])



    return (
        <div className=" py-6 px-5">
            <div className=" mb-5 ">
                <Link href={"/dashboard/order/order-form"}>
                    <Button className=" text-sm cursor-pointer w-40 rounded-md bg-[#E5E5E5] text-black font-bold hover:bg-[#E5E5E5]">
                        Add new order
                    </Button>
                </Link>
            </div>
            <div>
                <Table className=" px-5">

                    <TableHeader className=" bg-[#cfcdcd] px-10 ">
                        <TableRow className=" h-14 rounded-t-md">
                            <TableHead className="w-40 text-center">Index</TableHead>
                            <TableHead className="text-center">Customer Name</TableHead>
                            <TableHead className="text-center">Total Price</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderData.map((pro: any, index: any) => (
                            <TableRow key={pro.id}>
                                <TableCell className=" text-center">{index + 1}</TableCell>
                                <TableCell className=" text-center">{pro.customerName}</TableCell>
                                <TableCell className=" text-center">{pro.totalPrice}</TableCell>
                                <TableCell className=" text-center">{pro.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


