import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface orderState {
    pending: number;
    compleate: number;
    loading: boolean;
    error: string | null
}


const initialState: orderState = {
    pending: 0,
    compleate: 0,
    loading: false,
    error: null
}


// get fetch 
export const getfetchPendingOrder = createAsyncThunk(
    "dashbardpending/getfetchPendingOrder",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/pending/or/compleate/order`);
        const data = await res.json();
        return data.data
    }
)

const PendingSlice = createSlice({
    name: "Pendingslice",
    initialState,
    reducers: {
        setpendingOrder: (state: any, action: any) => {
            state.pending = action.payload.Pending
            state.compleate = action.payload.Compleate
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getfetchPendingOrder.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getfetchPendingOrder.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.pending = action.payload.Pending;
                state.compleate = action.payload.Compleate;
            })
            .addCase(getfetchPendingOrder.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});



export const pendingReducer = PendingSlice.reducer