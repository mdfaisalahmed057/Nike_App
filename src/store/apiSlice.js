import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.43.120:19001/';

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`
    }),
    createOrder:builder.mutation({
      query:(newOrder)=>({
        method:'POST',
        url:'orders',
        body:newOrder,
      }),
    }),
    createUser:builder.mutation({
query:(newuser)=>({
  method:"POST",
  url:"signup",
  body:newuser
})
}),
loginUser:builder.mutation({
  query:(loginuser)=>({
    method:"POST",
    url:"login",
    body:loginuser
  })
  }),
    getOrder:builder.query({
      query:(id)=>`orders/${id}`,
    }), 
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation,useGetProductsQuery, useGetProductQuery,useCreateOrderMutation,useGetOrderQuery,useCreateUserMutation } = apiSlice;