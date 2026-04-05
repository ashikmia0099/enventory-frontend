'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { appDispatch, rootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import * as React from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface Order {
    id: string,
    customerName: string,
    totalPrice: number,
    status: string,
    createdAt: string
}

enum OrderStatus {
    Pending = "Pending",
    Confirmed = "Confirmed",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled",
}

export function DailyOrder() {

    const dispatch = useDispatch<appDispatch>();
    const { orderData } = useSelector((state: rootState) => state.order);
    const { productData } = useSelector((state: rootState) => state.product);

    const [orders, setOrders] = useState<Order[]>([]);
    const [date, setDate] = React.useState<Date | undefined>()
    const [selectedStatus, setselectedStatus] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("");


    const fetchOrder = async (status?: string, date?: string) => {
    try {
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/order/filter`;

        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (date) params.append("date", date);

        url += `?${params.toString()}`;

        const res = await fetch(url);
        const data = await res.json();

        setOrders(data.data || []);
    } catch (error) {
        console.error(error);
    }
};
    useEffect(() => {
        fetchOrder()
    }, []);



    return (
        <div className=" py-6 px-5">
            <div className=" mb-5 ">
                <h3 className=" text-2xl font-semibold text-center">Currently All Order</h3>
            </div>
            <div className=" flex pb-3 gap-x-3">
                <div>
                    <Select
                        onValueChange={(value) => {
                            setselectedStatus(value)
                            fetchOrder(value, selectedDate)
                        }}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Object.values(OrderStatus).map((status) => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger>
                            <button className="px-3 py-2  text-black rounded-md shadow-sm transition border-2 border-gray-600 text-sm w-40">
                                {date ? date.toLocaleDateString() : "Select Date"}
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="mx-auto p-3  rounded-xl shadow-md bg-[#ffff]">
                             <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selected) => {
                                setDate(selected)

                                if (selected) {
                                    const formatted = selected.toISOString().split("T")[0]
                                    setSelectedDate(formatted)

                                    fetchOrder(selectedStatus, formatted)
                                }
                            }}
                            className="rounded-md border"
                        />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div>
                <Table className=" px-5">
                    <TableHeader className=" bg-[#cfcdcd] px-10 ">
                        <TableRow className=" h-14 rounded-t-md">
                            <TableHead className="w-40 text-center">Index</TableHead>
                            <TableHead className="text-center">Customer Name</TableHead>
                            <TableHead className="text-center">Total Price</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Order Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orders.length > 0 ? (

                                orders.map((order, index) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell className="text-center">{order.customerName}</TableCell>
                                        <TableCell className="text-center">${order.totalPrice}</TableCell>
                                        <TableCell className="text-center">{order.status}</TableCell>
                                        <TableCell className="text-center">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-red-500 py-5">
                                        {
                                            selectedStatus && selectedDate
                                                ? "This status & date data not available"
                                                : selectedStatus
                                                    ? "This status data not available"
                                                    : selectedDate
                                                        ? "This date data not available"
                                                        : "No data found"
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}