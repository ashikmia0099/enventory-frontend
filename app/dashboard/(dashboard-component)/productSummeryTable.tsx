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
import { getfetchRestockProduct } from "@/redux/features/restock/restockSlick";
import { appDispatch, rootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { postfetchCategory } from "@/redux/features/category/categorySlice";
import { toast } from "react-toastify";

const formSchema = z.object({
  categoryName: z.string().min(3).max(20),
});

export function ProductSummaryTable() {

    const dispatch = useDispatch<appDispatch>();
    const { products, loading } = useSelector((state: rootState) => state.restock);

    useEffect(() => {
        dispatch(getfetchRestockProduct());
    }, [dispatch]);

    
    
      type FormData = z.infer<typeof formSchema>;
    
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
          categoryName: "",
        },
      });
    
      async function onSubmit(data: z.infer<typeof formSchema>) {
    
        try {
          await dispatch(postfetchCategory(data)).unwrap()
          toast.success("Category create successfully.")
        }
        catch (err: any) {
          toast.error(err || "Something want wrong")
        }
      }


    return (
        <div className=" py-6">
            <div>
                <Table className=" px-5">
                    <TableHeader className=" bg-[#cfcdcd] px-10 ">
                        <TableRow className=" h-14 rounded-t-md">
                            <TableHead className="w-40 text-center">Index</TableHead>
                            <TableHead className="text-center">Product Name</TableHead>
                            <TableHead className="text-center">Number Of Stock</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Priority</TableHead>
                            <TableHead className="text-center">Add Product</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((pro: any, index: any) => (
                            <TableRow key={pro.id}>
                                <TableCell className="text-center">{index + 1}</TableCell>
                                <TableCell className="text-center">{pro.product.productName}</TableCell>
                                <TableCell className="text-center">{pro.product.stockQuentity}</TableCell>
                                <TableCell className="text-center">{pro.product.stockStatus}</TableCell>
                                <TableCell className="text-center">{pro.priority}</TableCell>
                                <TableCell className="text-center">
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button>
                                                Add Product
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <Card className="w-full sm:max-w-2xl mx-auto h-full">
                                                <CardContent>
                                                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                                                        <FieldGroup>
                                                            <Controller
                                                                name="categoryName"
                                                                control={form.control}
                                                                render={({ field, fieldState }) => (
                                                                    <Field data-invalid={fieldState.invalid}>
                                                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                                                            Product Quentity
                                                                        </FieldLabel>
                                                                        <Input
                                                                            {...field}
                                                                            id="form-rhf-demo-title"
                                                                            aria-invalid={fieldState.invalid}
                                                                            placeholder="Added Product Quentity"
                                                                            autoComplete="off"
                                                                        />
                                                                        {fieldState.invalid && (
                                                                            <FieldError errors={[fieldState.error]} />
                                                                        )}
                                                                    </Field>
                                                                )}
                                                            />
                                                        </FieldGroup>
                                                    </form>
                                                </CardContent>
                                                <CardFooter>
                                                    <Field orientation="horizontal">
                                                        <Button type="submit" className=" w-full rounded-full" form="form-rhf-demo">
                                                            Submit
                                                        </Button>
                                                    </Field>
                                                </CardFooter>
                                            </Card>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}


