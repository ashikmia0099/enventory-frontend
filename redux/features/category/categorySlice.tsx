import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
interface Category {
    id: string;
    categoryName: string;
}

interface CategoryState {
    categoryData: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categoryData: [],
    loading: false,
    error: null

}

// get fetch 
export const getfetchCategory = createAsyncThunk(
    "category/getfetchCategory",
    async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`);
        return await res.json();
    }
)

// post fetch 

export const postfetchCategory = createAsyncThunk<any,any,{ rejectValue: string }>(
    "category/postfetchCategory",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.message || "Failed to post");
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setdonatioFAQ: (state: any, action: any) => {
            state.categoryData = action.payload
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(getfetchCategory.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getfetchCategory.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.categoryData = action.payload.data;
            })
            .addCase(getfetchCategory.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // post life cyicle

            .addCase(postfetchCategory.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(postfetchCategory.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.categoryData.push(action.payload.data)
            })
            .addCase(postfetchCategory.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
});


export const categoryReducer = categorySlice.reducer