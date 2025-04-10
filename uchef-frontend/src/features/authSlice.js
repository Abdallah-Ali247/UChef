import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null,
    isLoading: true, // Add a loading state
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            state.isLoading = false; // Mark as loaded
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isLoading = false; // Reset loading state
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;