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
import { getfetchCategory } from "@/redux/features/category/categorySlice";
import { appDispatch, rootState } from "@/redux/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function CategoryTable() {

  const dispatch = useDispatch<appDispatch>();
  const { categoryData } = useSelector((state: rootState) => state.category);

  useEffect(() => {
    dispatch(getfetchCategory())
  }, [dispatch])


  return (
    <div className=" py-6 px-5">
      <div className=" mb-5 ">
       <Link href={"/dashboard/category/category-form"}>
        <Button className=" text-sm cursor-pointer w-40 rounded-md bg-[#E5E5E5] text-black font-bold hover:bg-[#E5E5E5]">
          Add new category
        </Button>
       </Link>
      </div>
      <div>
        <Table className=" px-5">
          <TableHeader className=" bg-[#cfcdcd] px-10 ">
            <TableRow className=" h-14 rounded-t-md">
              <TableHead className="w-40 text-center">Index</TableHead>
              <TableHead className="text-center">Category Name</TableHead>
              <TableHead className="text-center">Category Wise All Product</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryData.map((cat: any, index: any) => (
              <TableRow key={cat.id}>
                <TableCell className=" text-center">{index + 1}</TableCell>
                <TableCell className=" text-center">{cat.categoryName}</TableCell>
                <TableCell className=" text-center">Apple</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


