
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import cartReducer from './features/cartSlice';


const preloadedState = {
    cart: JSON.parse(localStorage.getItem('cart')) || { items: [] },
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    preloadedState,
});

export default store;