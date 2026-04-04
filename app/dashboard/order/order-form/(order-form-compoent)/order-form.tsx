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

import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import { appDispatch, rootState } from "@/redux/store"
import { toast, ToastContainer } from "react-toastify"
import { getfetchOrder, postfetchOrder } from "@/redux/features/order/orderSlice"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    customerName: z.string(),
});

export function OrderForm() {

    const router = useRouter()

    const dispatch = useDispatch<appDispatch>();
    const { orderData } = useSelector((state: rootState) => state.order);

    React.useEffect(() => {
        dispatch(getfetchOrder())
    }, [dispatch])

    type FormData = z.infer<typeof formSchema>;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            customerName: ""
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            await dispatch(postfetchOrder(data)).unwrap()
            router.push("/dashboard/order")
        }
        catch (err: any) {
            toast.error(err || "Something want wrong")
        }
    }

    



    return (
        <div>
            <ToastContainer />
            <div>
                <h1 className=" text-2xl font-semibold py-10 text-center">Add New Order</h1>
            </div>
            <div>
                <Card className="w-full sm:max-w-2xl mx-auto h-full">
                    <CardContent>
                        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Controller
                                    name="customerName"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-rhf-demo-title">
                                                Customer Name
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="form-rhf-demo-title"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Customer Name"
                                                autoComplete="off" />
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