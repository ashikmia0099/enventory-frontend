import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface product {
    id: string;
    productName: string;
    price: number;
    stockQuentity: number;
    minimumStockThreshold: number;
    image: string;
    stockStatus: string;
    categoryId: string;
    category: Category;
    createdAt: string;
    updatedAt: string;
}

interface productState {
    productData: product[];
    loading: boolean;
    error: string | null
}


export interface Category {
    id: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
}

const initialState: productState = {
    productData: [],
    loading: false,
    error: null
}


// fetch all products
export const getfetchProduct = createAsyncThunk<product[]>(
    "product/getfetchProduct",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`);
        const data = await res.json();
        return data.data;
    }
);

// create new product
export const postfetchProduct = createAsyncThunk<product, any>(
    "product/postfetchProduct",
    async (formData, { rejectWithValue }) => {
        try {
            const form = new FormData();
            form.append("productName", formData.productName);
            form.append("price", formData.price);
            form.append("stockQuentity", formData.stockQuentity);
            form.append("minimumStockThreshold", formData.minimumStockThreshold);
            form.append("categoryId", formData.categoryId);
            form.append("image", formData.image);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`, {
                method: "POST",
                body: form,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to post product");
            return data.data;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get life cyrcle
            .addCase(getfetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getfetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.productData = action.payload;
            })
            .addCase(getfetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message || "Error fetching products";
            })

            // post life cyrcle
            .addCase(postfetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postfetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.productData.push(action.payload);
            })
            .addCase(postfetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || action.error.message || "Error creating product";
            });
    }
});

export default productSlice.reducer;



export const produactReducer = productSlice.reducer