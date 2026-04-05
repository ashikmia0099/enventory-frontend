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
import { getfetchRestockProduct } from "@/redux/features/restock/restockSlick";
import { appDispatch, rootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

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
import { toast } from "react-toastify";

const formSchema = z.object({
    addedStock: z.preprocess(
        (val) => Number(val),
        z.number().min(1, "Quantity must be at least 1")
    ),
});

export function ProductSummaryTable() {

    const dispatch = useDispatch<appDispatch>();
    const { products, loading } = useSelector((state: rootState) => state.restock);

    useEffect(() => {
        dispatch(getfetchRestockProduct());
    }, [dispatch]);

    type FormData = z.infer<typeof formSchema>;

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            addedStock: 0,
        },
    });


    async function submitStock(data: FormData, productId: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restock/add/product/${productId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ addedStock: data.addedStock }),
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message);
            toast.success("Stock updated successfully");
            dispatch(getfetchRestockProduct());
            form.reset();
        } catch (err: any) {
            toast.error(err.message);
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
                                                    <form
                                                        id={`form-${pro.id}`}
                                                        onSubmit={form.handleSubmit((data) => submitStock(data, pro.product.id))}
                                                    >
                                                        <FieldGroup>
                                                            <Controller
                                                                name="addedStock"
                                                                control={form.control}
                                                                render={({ field, fieldState }) => (
                                                                    <Field data-invalid={fieldState.invalid}>
                                                                        <FieldLabel>Product Quantity</FieldLabel>
                                                                        <Input
                                                                            {...field}
                                                                            type="number"
                                                                            placeholder="Enter quantity"
                                                                        />
                                                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                                    </Field>
                                                                )}
                                                            />
                                                        </FieldGroup>
                                                    </form>

                                                    <CardFooter >
                                                        <Field orientation="horizontal">
                                                            <Button 
                                                                type="submit"
                                                                form={`form-${pro.id}`} 
                                                                className=" w-full rounded-full">
                                                                Add Quentity
                                                            </Button>
                                                        </Field>
                                                    </CardFooter>
                                                </CardContent>
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


