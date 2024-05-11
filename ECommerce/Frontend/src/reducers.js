import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
};

const customReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("ADD_TO_CART", (state, action) => {
            const { quantity } = action.payload
            const { price } = action.payload
            const newTotal = price * quantity

            const existingItem = state.cartItems.find(item => item.id === action.payload.id) // IT WILL RETURN THE OBJECT IF FOUND

            if (!existingItem) {
                state.cartItems = [...state.cartItems, action.payload];
            }

            else {
                existingItem.quantity = quantity
                existingItem.subTotal = newTotal
            }

        })
        .addCase('REMOVE_FROM_CART', (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        })
        .addCase("CLEAR_CART", (state) => {
            state.cartItems = [];
        })
        .addCase("SET_CART_FROM_LS", (state, action) => {
            state.cartItems = action.payload;
        })
});

export default customReducer;





























// EXPLANATION
// 'item' stands for each element present in the array.
// With 'item.id', we are accessing the 'id' property of each element in the array.
// 'action.payload.id' is the 'id' sent from the frontend.
// In the filtered array, only the elements whose 'id' does not match the 'id' sent from the frontend will remain.