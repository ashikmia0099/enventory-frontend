import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface order {
    id: string;
    customerName: string;
    totalPrice: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface orderState {
    orderData: order[];
    loading: boolean;
    error: string | null
}

const initialState: orderState = {
    orderData: [],
    loading: false,
    error: null
}


// get fetch 
export const getfetchOrder = createAsyncThunk(
    "order/getfetchOrder",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`);
        return await res.json();
    }
)

// post fetch
export const postfetchOrder = createAsyncThunk(
  "order/postfetchOrder",
  async (formData: any, { rejectWithValue }) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName: formData.customerName }),
      });

      const result = await res.json(); // backend response

      if (!res.ok) {
        throw new Error(result.message || "Failed to post");
      }

      return result.data; // <<< only the array
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);



const orderSlice = createSlice({
    name: "orderData",
    initialState,
    reducers: {
        setOrder: (state: any, action: any) => {
            state.orderData = action.payload
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getfetchOrder.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getfetchOrder.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.orderData = action.payload.data;
            })
            .addCase(getfetchOrder.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchOrder.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(postfetchOrder.fulfilled, (state: any, action: any) => {
                state.loading = false;
                // action.payload is already the array containing the new order(s)
                // If backend returns a single object, wrap it in array
                if (Array.isArray(action.payload)) {
                    state.orderData.push(...action.payload); // spread array
                } else {
                    state.orderData.push(action.payload); // single object
                }
            })
            .addCase(postfetchOrder.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })

        // delete api lifecycle

        // .addCase(deletefetchDonationFAQ.fulfilled, (state, action) => {
        //     state.donationFAQ = state.donationFAQ.filter(item => item.id !== action.payload)
        // })
        // .addCase(deletefetchDonationFAQ.rejected, (state, action) => {
        //     state.error = action.payload || action.error.message
        // })
    }
});



export const orderReducer = orderSlice.reducer