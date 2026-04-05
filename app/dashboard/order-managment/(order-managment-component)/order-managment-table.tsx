'use client'
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getfetchOrder } from "@/redux/features/order/orderSlice";
import { getfetchProduct } from "@/redux/features/product/productSlice";
import { appDispatch, rootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Category {
    id: string;
    categoryName: string;
}

interface Product {
    id: string;
    productName: string;
    price: number;
    stockQuentity: number;
    categoryId: string;
    category?: Category;
    image: string;
    stockStatus: string
}

enum OrderStatus {
    Pending = "Pending",
    Confirmed = "Confirmed",
    Shipped = "Shipped",
    Delivered = "Delivered",
    Cancelled = "Cancelled"
}

interface Order {
    id: string;
    customerName: string;
    totalPrice: number;
    status: string;
}

interface selectedProduct {
    productId: string,
    productName: string,
    quentity: number,
    price: number,
    subTotal: number
}

export function OrderManagmentTable() {

    const dispatch = useDispatch<appDispatch>();
    const { orderData } = useSelector((state: rootState) => state.order);
    const { productData } = useSelector((state: rootState) => state.product);
    const [selectedCategory, setSelectedCategory] = useState<{ [orderId: string]: string }>({});
    const [activeProduct, setActiveProduct] = useState<{ [orderId: string]: Product | null }>({});
    const [productQuentity, setProductQuentity] = useState<{ [orderId: string]: number }>({});
    const [stockStatus, setStockStatus] = useState<{ [productId: string]: string }>({});
    const [selectedProduct, setSelectedProduct] = useState<{ [orderId: string]: selectedProduct[] }>({});
    const [orderStatusState, setOrderStatus] = useState<{ [id: string]: string }>({})

    console.log("selected product", selectedProduct)

    useEffect(() => {
        dispatch(getfetchOrder())
        dispatch(getfetchProduct())
    }, [dispatch])

    const handleCateogrySelect = (orderId: string, categoryId: string) => {
        setSelectedCategory(prev => ({ ...prev, [orderId]: categoryId }));
    }

    // get unique category 
    const uniqueCategory: Category[] = Array.from(
        new Map(productData.filter(p => p.category).map(p => [p.category!.id, p.category])).values()
    );

    // order status handler 

    const handleOrderStatus = (orderId: string, status: string) => {
        setOrderStatus(prev => ({
            ...prev, [orderId]: status
        }))
    }

    // card quentity imcrement and decrement 

    const incrementQuentity = (orderId: string, prod: Product) => {
        setProductQuentity(prev => {
            const currentQty = prev[orderId] || 0;
            const availableStock = prod.stockQuentity - currentQty;
            if (availableStock > 0) {
                const newQty = currentQty + 1;
                setStockStatus(prevStatus => ({
                    ...prevStatus,
                    [prod.id]: availableStock - 1 === 0 ? "OutOfStock" : "Active"
                }));
                return { ...prev, [orderId]: newQty };
            }
            return prev;
        });
    };

    const decreaseQuentity = (orderId: string, prod: Product) => {
        setProductQuentity(prev => {
            const currentQty = prev[orderId] || 0;
            if (currentQty > 0) {
                const newQty = currentQty - 1;
                const availableStock = prod.stockQuentity - newQty;
                setStockStatus(prevStatus => ({
                    ...prevStatus,
                    [prod.id]: availableStock === 0 ? "OutOfStock" : "Active"
                }));
                return { ...prev, [orderId]: newQty };
            }
            return prev;
        });
    };


    // filter delivered order 

    const pendingOrders = orderData.filter(
        (order) => order.status !== "Delivered"
    );

    const handleCompleteOrder = async (orderId: string) => {
        try {
            const products = selectedProduct[orderId] || [];
            const newStatus = orderStatusState[orderId] || "Pending";

            if (products.length === 0) {
                alert("No product selected!");
                return;
            }

            const items = products.map(p => ({
                productId: p.productId,
                quantity: p.quentity,
            }));

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId,
                    items,
                    status: newStatus
                })
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    title: "Order updated!",
                    icon: "success",
                    draggable: true
                });

                setSelectedProduct(prev => {
                    const newState = { ...prev };
                    delete newState[orderId];
                    return newState;
                });

                dispatch(getfetchOrder());
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className=" py-6 px-5">
            <div className=" mb-5 ">
                <h3 className=" text-2xl font-semibold text-center">Currently All Order</h3>
            </div>
            <div>
                <Table className=" px-5">
                    <TableHeader className=" bg-[#cfcdcd] px-10 ">
                        <TableRow className=" h-14 rounded-t-md">
                            <TableHead className="w-40 text-center">Index</TableHead>
                            <TableHead className="text-center">Customer Name</TableHead>
                            <TableHead className="text-center">Select Category</TableHead>
                            <TableHead className="text-center">Select Product</TableHead>
                            <TableHead className="text-center">View Product Details</TableHead>
                            <TableHead className="text-center capitalize">View Quentity and Subtotal </TableHead>
                            <TableHead className="text-center"> total Price </TableHead>
                            <TableHead className="text-center">Update Order Status</TableHead>
                            <TableHead className="text-center">Compleate Order</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingOrders.map((order: any, index: any) => {
                            const filterProduct = productData.filter(
                                p => p.categoryId === selectedCategory[order.id]
                            );
                            const rowProduct = selectedProduct[order.id] || [];
                            const totalprice = rowProduct.reduce((acc, p) => acc + p.subTotal, 0);
                            const prod = activeProduct[order.id];

                            return (
                                <TableRow key={order.id}>
                                    <TableCell className=" text-center">{index + 1}</TableCell>
                                    <TableCell className=" text-center">{order.customerName}</TableCell>
                                    <TableCell className=" text-center">
                                        <Select onValueChange={(value) => (handleCateogrySelect(order.id, value))}>
                                            <SelectTrigger className=" w-full">
                                                <SelectValue placeholder="Select Category"></SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        uniqueCategory.map((cat: any) => (
                                                            <SelectItem key={cat.id} value={cat.id}>
                                                                {cat.categoryName}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className=" text-center">
                                        <Select onValueChange={(value) => {
                                            const product = productData.find(p => p.id === value)
                                            setActiveProduct(prev => ({
                                                ...prev, [order.id]: product || null
                                            }))
                                        }}>
                                            <SelectTrigger className=" w-full">
                                                <SelectValue placeholder="Select Product" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {filterProduct.length > 0 ? (
                                                        filterProduct.map((product: Product) => (
                                                            <SelectItem key={product.id} value={product.id}>
                                                                {product.productName}
                                                            </SelectItem>
                                                        ))
                                                    ) : (
                                                        <div className="text-center text-sm text-gray-400">
                                                            No Product Found
                                                        </div>
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className=" text-center">
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button variant="outline">Details</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    {
                                                        prod ? (
                                                            <div className=' rounded-md border w-60 mx-auto border-gray-500 p-2 flex flex-col' key={prod.id}>
                                                                <div>
                                                                    <img src={prod.image} alt={prod.productName} className=' h-32 rounded-md w-full' />
                                                                </div>
                                                                <div className=' py-1.5 pt-5'>
                                                                    <h5 className=' text-lg font-bold'>{prod.productName}</h5>
                                                                </div>
                                                                <div className=' flex items-center justify-between'>
                                                                    <div className=' flex items-center gap-x-1'>
                                                                        <span>
                                                                            <h5 className=' text-base font-semibold text-black'>Price : </h5>
                                                                        </span>
                                                                        <span>
                                                                            <h5 className=' text-sm font-semibold text-black pt-1'>${prod.price} </h5>
                                                                        </span>
                                                                    </div>
                                                                    <div className=' flex items-center gap-x-1.5'>
                                                                        <span>
                                                                            <h5 className=' text-base font-semibold text-black'>Stock : </h5>
                                                                        </span>
                                                                        <span>
                                                                            <h5 className=' text-sm font-semibold text-black pt-1'>
                                                                                {prod.stockQuentity - (productQuentity[order.id] || 0)}
                                                                            </h5>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className=' flex items-center justify-between pt-1'>
                                                                    <div className=' flex items-center gap-x-1'>
                                                                        <span>
                                                                            <h5 className=' text-sm font-semibold text-black'>Stock Status : </h5>
                                                                        </span>
                                                                        <span>
                                                                            <h5 className=' text-xs font-semibold text-green-600 pt-0.5'>
                                                                                {prod.stockStatus}
                                                                            </h5>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className=' mt-auto pt-5 flex items-center justify-between'>
                                                                    <div className=' border-2 '>
                                                                        <div className=' grid grid-cols-3 items-center'>
                                                                            <div className=' border-r-2 px-2'>
                                                                                <h5
                                                                                    className=' text-2xl font-bold text-black cursor-pointer'
                                                                                    onClick={() => decreaseQuentity(order.id, prod)}
                                                                                >-</h5>
                                                                            </div>
                                                                            <div className=' border-r-2'>
                                                                                <h5 className=' text-xl font-bold text-black text-center'>
                                                                                    {productQuentity[order.id] || 0}
                                                                                </h5>
                                                                            </div>
                                                                            <div>
                                                                                <h5
                                                                                    onClick={() => incrementQuentity(order.id, prod)}
                                                                                    className=' text-2xl font-bold text-black text-center cursor-pointer'>
                                                                                    +
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <Button
                                                                            className='w-full'
                                                                            onClick={() => {
                                                                                const quentity = productQuentity[order.id] || 0;
                                                                                if (!prod || quentity === 0) return;

                                                                                const subTotal = quentity * prod.price;
                                                                                setSelectedProduct(prev => {
                                                                                    const prevProducts = prev[order.id] || [];
                                                                                    const existingIndex = prevProducts.findIndex(p => p.productId === prod.id);
                                                                                    if (existingIndex >= 0) {
                                                                                        const updated = [...prevProducts];
                                                                                        updated[existingIndex].quentity += quentity;
                                                                                        updated[existingIndex].subTotal += subTotal;
                                                                                        return { ...prev, [order.id]: updated };
                                                                                    }
                                                                                    const newProduct: selectedProduct = {
                                                                                        productId: prod.id,
                                                                                        productName: prod.productName,
                                                                                        quentity,
                                                                                        price: prod.price,
                                                                                        subTotal
                                                                                    };

                                                                                    return { ...prev, [order.id]: [...prevProducts, newProduct] };
                                                                                });
                                                                                setProductQuentity(prev => ({ ...prev, [order.id]: 0 }));
                                                                            }}>
                                                                            Add
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>No Product Selected</div>
                                                        )
                                                    }
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <ul>
                                            {(selectedProduct[order.id] || []).map((p) => (
                                                <li key={p.productId}>
                                                    {p.quentity} * $ {p.price} = ${p.subTotal}
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell className=" text-center">$ {totalprice}</TableCell>
                                    <TableCell className=" text-center">
                                        <Select
                                            value={orderStatusState[order.id] || order.status}
                                            onValueChange={(value) => handleOrderStatus(order.id, value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        Object.values(OrderStatus).filter(value => isNaN(Number(value)))
                                                            .map((status) => (
                                                                <SelectItem key={status} value={status}>
                                                                    {status}
                                                                </SelectItem>
                                                            ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className=" text-center">
                                        <Button onClick={() => handleCompleteOrder(order.id)}>
                                            Complete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}