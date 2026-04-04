import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RestockProduct {
    id: string;
    productId: string;
    priority: "High" | "Medium" | "Low";
    product: {
        productName: string;
        price: number;
        stockQuentity: number;
        stockStatus: string;
        image: string;
    };
}
interface RestockProductState {
    products: RestockProduct[];
    loading: boolean;
    error: string | null
}


const initialState: RestockProductState = {
    products: [],
    loading: false,
    error: null
}

export const getfetchRestockProduct = createAsyncThunk<RestockProduct[]>(
    "RestockProduct/getfetchRestockProduct",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restock`);
        const data = await res.json();
        return data.data;
    }
);


const RestockProductlice = createSlice({
    name: "selectedRestockProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getfetchRestockProduct.pending, (state : any) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getfetchRestockProduct.fulfilled, (state : any, action : any) => {
                state.loading = false;
                state.products = action.payload
            })
            .addCase(getfetchRestockProduct.rejected, (state : any, action : any) => {
                state.loading = false;
                state.error = action.payload ?? "Something want wrong"
            })
    }
})


export const RestockProductReducer = RestockProductlice.reducer