"use client"

import * as React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormData = {
  customerName: string;
};

export function OrderForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to post");

      Swal.fire({
        title: "Order added successfully!",
        icon: "success",
        draggable: true,
      });

      reset();
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "Something went wrong",
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold py-10 text-center">Add New Order</h1>

      <Card className="w-full sm:max-w-2xl mx-auto h-full">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field data-invalid={!!errors.customerName}>
                <FieldLabel>Customer Name</FieldLabel>
                <Input
                  {...register("customerName", { required: "Customer Name is required" })}
                  placeholder="Customer Name"
                  autoComplete="off"
                />
                {errors.customerName && <FieldError errors={[errors.customerName]} />}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full rounded-full" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}