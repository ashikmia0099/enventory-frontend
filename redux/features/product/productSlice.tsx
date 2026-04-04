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
    category: Category; // backend থেকে include
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


// export const getfetchProduct = createAsyncThunk(
//     "product/getfetchProduct",
//     async () => {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`);
//         return await res.json();
//     }
// )


// export const postfetchProduct = createAsyncThunk(
//   "product/postfetchProduct",
//   async (formData: any, { rejectWithValue }) => {
//     try {
//       const form = new FormData();

//       form.append("productName", formData.productName);
//       form.append("price", formData.price);
//       form.append("stockQuentity", formData.stockQuentity);
//       form.append("minimumStockThreshold", formData.minimumStockThreshold);
//       form.append("categoryId", formData.categoryId);
//       form.append("image", formData.image); 

//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`, {
//         method: "POST",
//         body: form,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to post");
//       }

//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );



// fetch all products
export const getfetchProduct = createAsyncThunk<product[]>(
    "product/getfetchProduct",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product`);
        const data = await res.json();
        return data.data; // prisma response এর data field
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
            return data.data; // return new product
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);



// const productSlice = createSlice({
//     name: "product",
//     initialState,
//     reducers: {
//         setdonatioFAQ: (state: any, action: any) => {
//             state.productData = action.payload
//         }
//     },
//     extraReducers: (builder: any) => {
//         builder
//             .addCase(getfetchProduct.pending, (state: any) => {
//                 state.loading = true
//             })
//             .addCase(getfetchProduct.fulfilled, (state: any, action: any) => {
//                 state.loading = false;
//                 state.productData = action.payload.data;
//             })
//             .addCase(getfetchProduct.rejected, (state: any, action: any) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })

//         // post life cyicle

//         .addCase(postfetchProduct.pending, (state : any) => {
//             state.loading = true;
//         })
//         .addCase(postfetchProduct.fulfilled, (state : any, action : any) => {
//             state.loading = false;
//             state.productData.push(action.payload.data)
//         })
//         .addCase(postfetchProduct.rejected, (state : any, action : any) => {
//             state.loading = false;
//             state.error = action.error.message;
//         })

//         // delete api lifecycle

//         // .addCase(deletefetchDonationFAQ.fulfilled, (state, action) => {
//         //     state.donationFAQ = state.donationFAQ.filter(item => item.id !== action.payload)
//         // })
//         // .addCase(deletefetchDonationFAQ.rejected, (state, action) => {
//         //     state.error = action.payload || action.error.message
//         // })
//     }
// });


const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET PRODUCTS
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

            // POST PRODUCT
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