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
import { getfetchProduct } from "@/redux/features/product/productSlice";
import { appDispatch, rootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ProductTable() {

    const dispatch = useDispatch<appDispatch>();
    const { productData } = useSelector((state: rootState) => state.product);

    useEffect(() => {
        dispatch(getfetchProduct())
    }, [dispatch])

    return (
        <div className=" py-6 px-5">
            <div className=" mb-5 ">
                <Link href={"/dashboard/add-product/product-form"}>
                    <Button className=" text-sm cursor-pointer w-40 rounded-md bg-[#E5E5E5] text-black font-bold hover:bg-[#E5E5E5]">
                        Add new produact
                    </Button>
                </Link>
            </div>
            <div>
                <Table className=" px-5">
                    <TableHeader className=" bg-[#cfcdcd] px-10 ">
                        <TableRow className=" h-14 rounded-t-md">
                            <TableHead className="w-40 text-center">Index</TableHead>
                            <TableHead className="text-center">Category Name</TableHead>
                            <TableHead className="text-center">Produact Name</TableHead>
                            <TableHead className="text-center">Stock Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productData.map((pro: any, index: any) => (
                            <TableRow key={pro.id}>
                                <TableCell className=" text-center">{index + 1}</TableCell>
                                <TableCell className=" text-center">{pro.category.categoryName}</TableCell>
                                <TableCell className=" text-center">{pro.productName}</TableCell>
                                <TableCell className=" text-center">{pro.stockStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


