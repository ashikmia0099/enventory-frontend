import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface orderState {
    orderData: number;
    loading: boolean;
    error: string | null
}


const initialState: orderState = {
    orderData: 0,
    loading: false,
    error: null
}


// get fetch 
export const getfetchtoDayOrder = createAsyncThunk(
    "dashboardorder/getfetchtoDayOrder",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/today/total/order`);
        const data = await res.json();
        return data.data
    }
)

const toDayOrderSlice = createSlice({
    name: "todayorder",
    initialState,
    reducers: {
        setTodayOrder: (state: any, action: any) => {
            state.orderData = action.payload
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getfetchtoDayOrder.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getfetchtoDayOrder.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.orderData = action.payload;
            })
            .addCase(getfetchtoDayOrder.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});



export const toOrderReducer = toDayOrderSlice.reducer