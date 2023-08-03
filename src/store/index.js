import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productSlice } from "./productSlice";
import { cartSlice } from "./CartSlice";
import { apiSlice } from "./apiSlice";
import { authSlice } from "./autSlice";
export const store=configureStore({
    reducer:{
        products:productSlice.reducer,
        cart:cartSlice.reducer,
        api: apiSlice.reducer,
        auth:authSlice.reducer
      },
    //adding the api middleware enables caching invalidation,polling
    // and other useful feature of 'rtk-query'
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

 