import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface orderItem {
    id: string;
    quantity: number;
    price: number;
    subTotal: number;
    createdAt: string;
    updatedAt: string;

}

interface orderItemState {
    orderItemData: orderItem[];
    loading: boolean;
    error: string | null
}


const initialState: orderItemState = {
    orderItemData: [],
    loading: false,
    error: null
}


// get fetch 
export const getfetchOrderItem = createAsyncThunk(
    "orderItem/getfetchOrderItem",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/item/relation/data`);
        return await res.json();
    }
)

// post fetch
export const postfetchOrder = createAsyncThunk(
    "order/postfetchOrder",
    async (formData: any, { rejectWithValue }) => {
        try {
            const form = new FormData();

            form.append("customerName", formData.customerName);

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
                method: "POST",
                body: form,
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to post");
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);



const orderItemSlice = createSlice({
    name: "orderItem",
    initialState,
    reducers: {
        setOrder: (state: any, action: any) => {
            state.orderItemData = action.payload
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getfetchOrderItem.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getfetchOrderItem.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.orderItemData = action.payload.data;
            })
            .addCase(getfetchOrderItem.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchOrder.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(postfetchOrder.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.orderData.push(action.payload.data)
            })
            .addCase(postfetchOrder.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});



export const orderItemReducer = orderItemSlice.reducer