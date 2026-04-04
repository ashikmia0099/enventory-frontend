"use client"

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
import { postfetchCategory } from "@/redux/features/category/categorySlice"

const formSchema = z.object({
  categoryName: z.string().min(3).max(20),
});

export function CategoryForm() {


  const dispatch = useDispatch<appDispatch>();
  const { categoryData, loading, error } = useSelector((state: rootState) => state.category);

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
    <div>
      <div>
        <h1 className=" text-2xl font-semibold py-10 text-center">Create A New Category</h1>
      </div>
      <div>
        <Card className="w-full sm:max-w-2xl mx-auto h-full">
          <ToastContainer />
          <CardContent>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="categoryName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Category
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Category Name"
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
      </div>
    </div>
  )
}