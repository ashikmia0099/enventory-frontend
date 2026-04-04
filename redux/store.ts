import { configureStore } from "@reduxjs/toolkit";
import { RegisterReducer } from "./features/Register/registerSlice";
import { LoginReducer } from "./features/Login/LoginSlice";
import { categoryReducer } from "./features/category/categorySlice";
import { produactReducer } from "./features/product/productSlice";
import { orderReducer } from "./features/order/orderSlice";
import { orderItemReducer } from "./features/orderManagment/orderManagementSlice";



export const store = configureStore(({
    reducer : {
         register: RegisterReducer,
         login: LoginReducer,
         category: categoryReducer,
         product: produactReducer,
         order: orderReducer,
         orderItem: orderItemReducer,
    }
}))


export type rootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
