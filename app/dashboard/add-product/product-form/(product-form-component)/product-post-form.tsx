"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import { appDispatch, rootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import { getfetchCategory } from "@/redux/features/category/categorySlice"
import { postfetchProduct } from "@/redux/features/product/productSlice"

const formSchema = z.object({
    categoryId: z.string(),
    productName: z.string().min(3).max(20),
    price: z.number(),
    stockQuentity: z.number(),
    minimumStockThreshold: z.number(),
    image: z.any(),

});

export function ProduactForm() {



    const dispatch = useDispatch<appDispatch>();
    const { productData } = useSelector((state: rootState) => state.product);
    const { categoryData } = useSelector((state: rootState) => state.category);

    React.useEffect(() => {
        dispatch(getfetchCategory());
    }, [dispatch]);

    type FormData = z.infer<typeof formSchema>;


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            categoryId: "",
            productName: "",
            price: 0,
            stockQuentity: 0,
            minimumStockThreshold: 0,
            image: z.any()
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {

        try {
            await dispatch(postfetchProduct(data)).unwrap()
            toast.success("Producat add successfully.")
        }
        catch (err: any) {
            toast.error(err || "Something want wrong")
        }
    }

    return (
        <div>
            <div>
                <h1 className=" text-2xl font-semibold py-10 text-center">Add New Product</h1>
            </div>
            <div>
                <Card className="w-full sm:max-w-2xl mx-auto h-full">
                    <ToastContainer />
                    <CardContent>
                        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Controller
                                    name="categoryId"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field>
                                            <FieldLabel>Select Category</FieldLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectGroup>
                                                        {categoryData.map((cat: any) => (
                                                            <SelectItem key={cat.id} value={cat.id}>
                                                                {cat.categoryName}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup>
                                <Controller
                                    name="productName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-title">
                                                Product
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-rhf-demo-title"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Product Name"
                                                autoComplete="off" />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <div className=" flex gap-x-2 my-2">
                                <FieldGroup>
                                    <Controller
                                        name="price"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Product Price
                                                </FieldLabel>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    placeholder="Product Price"
                                                    autoComplete="off" />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                                <FieldGroup>
                                    <Controller
                                        name="stockQuentity"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-demo-title">
                                                    Product Stock Quentity
                                                </FieldLabel>
                                                <Input
                                                    type="number"
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    placeholder="Stock Quentity"
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </div>
                            <FieldGroup>
                                <Controller
                                    name="minimumStockThreshold"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-title">
                                                Minimum stock thres hold
                                            </FieldLabel>
                                            <Input
                                                type="number"
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                placeholder="Minimum stock thres hold"
                                                autoComplete="off"
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                            <FieldGroup className="">
                                <FieldLabel htmlFor="form-rhf-demo-title" className=" pt-1">
                                    Choose product image
                                </FieldLabel>
                                <Controller
                                    name="image"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Input
                                            type="file"
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                        />
                                    )}
                                />
                            </FieldGroup>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Field orientation="horizontal">
                            <Button type="submit" className=" w-full rounded-full cursor-pointer" form="form-rhf-demo">
                                Submit
                            </Button>
                        </Field>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}