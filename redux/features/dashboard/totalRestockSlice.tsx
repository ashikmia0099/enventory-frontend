import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface restockState {
    restockCount: number;
    loading: boolean;
    error: string | null
}


const initialState: restockState = {
    restockCount: 0,
    loading: false,
    error: null
}


// get fetch 
export const getfetchRestockCount = createAsyncThunk(
    "dashboard/getfetchRestockCount",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/totalrestock`);
        const data = await res.json();
        return data.data
    }
)

const restockCountSlice = createSlice({
    name: "restockCount",
    initialState,
    reducers: {
        setRestockCount: (state: any, action: any) => {
            state.restockCount = action.payload
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getfetchRestockCount.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getfetchRestockCount.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.restockCount = action.payload;
            })
            .addCase(getfetchRestockCount.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});



export const restockCountReducer = restockCountSlice.reducer