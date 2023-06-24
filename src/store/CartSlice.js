import { createSelector, createSlice } from "@reduxjs/toolkit";
 const initialState={
    items:[],
    delivery:15,
    freeDeliveryFrom:200
 }
export const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addCartItem:(state,aciton)=>{
            const newProduct=aciton.payload.product 
            const cartItem=state.items.find((item)=>item.product.id===newProduct.id)
            if(cartItem){
                cartItem.quantity+=1
            }else{
                state.items.push({product:newProduct,quantity:1})
            }
        },
        changeQuantity:(state,action)=>{
        const {productId,amount}=action.payload;
        const cartItem=state.items.find(item=>item.product.id===productId)
        if(cartItem){
            cartItem.quantity+=amount
        }

        if(cartItem.quantity<=0){
            state.items=state.items.filter(item=>item!=cartItem)
        }

        }
    }
})

export const numberOfItems=((state)=>state.cart.items.length)
export const selectSubtotal=(state)=>state.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity,0)

  const cartSelector=(state)=>state.cart

export const selectDelivery=createSelector(
    cartSelector,
    selectSubtotal,
    (cart,subtotal)=>(subtotal>cart.freeDeliveryFrom?0:cart.delivery)
)

export const total=createSelector(
    selectDelivery,
    selectSubtotal,
    (delivery,subtotal)=>delivery+subtotal
)   