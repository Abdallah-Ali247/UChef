import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Array of cart items
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, name, pricePerUnit, weight, quantity } = action.payload;

            // Convert all values to numbers
            const numericPricePerUnit = parseFloat(pricePerUnit);
            const numericWeight = parseFloat(weight);
            const numericQuantity = parseInt(quantity, 10);
        
            // Check if the item already exists in the cart
            const existingItem = state.items.find((item) => item.id === id);
        
            if (existingItem) {
                // Update the existing item's weight and quantity
                existingItem.weight += weight;
                existingItem.quantity += quantity;
            } else {
                // Add a new item to the cart
                state.items.push({ id,
                    name,
                    pricePerUnit: numericPricePerUnit, // Ensure it's a number
                    weight: numericWeight,            // Ensure it's a number
                    quantity: numericQuantity,        // Ensure it's a number
                });
            }
        
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;