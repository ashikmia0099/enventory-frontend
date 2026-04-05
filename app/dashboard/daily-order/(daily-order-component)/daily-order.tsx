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

export function DailyOrder() {

    const dispatch = useDispatch<appDispatch>();
    const { orderData } = useSelector((state: rootState) => state.order);
    const { productData } = useSelector((state: rootState) => state.product);
    const [date, setDate] = React.useState<Date>()
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>("");

    useEffect(() => {

        fetch(`https://envetory-api.vercel.app/order/filter`)
            .then(res => res.json())
            .then(data => setOrders(data.data))
            .catch(err => console.error(err));
    }, []);


    return (
        <div className=" py-6 px-5">
            <div className=" mb-5 ">
                <h3 className=" text-2xl font-semibold text-center">Currently All Order</h3>
            </div>
            <div className=" flex pb-3 gap-x-3">
                <div>
                    <Select>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger>
                            <button className="px-3 py-2 bg-blue-500 text-black rounded-md shadow-sm hover:bg-blue-600 transition border-2 border-gray-600 text-sm w-40">
                                {date ? date.toLocaleDateString() : "Select Date"}
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="mx-auto p-3  rounded-xl shadow-md bg-[#ffff]">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-lg border w-full"
                                captionLayout="dropdown"
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
                            orders.map((order, index) => (
                                <TableRow >
                                    <TableCell className=" text-center">{index + 1}</TableCell>
                                    <TableCell className=" text-center">{order.customerName}</TableCell>
                                    <TableCell className=" text-center">{order.totalPrice}</TableCell>
                                    <TableCell className=" text-center">{order.status}</TableCell>
                                    <TableCell className=" text-center">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}