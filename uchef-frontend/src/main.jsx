import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { setCredentials } from './features/authSlice';
import apiClient from './api/apiClient';
import { addItem } from './features/cartSlice';
// import './index.css';

// Initialize auth state from localStorage
const token = localStorage.getItem('token');
if (token) {
    store.dispatch(setCredentials({ token })); // Dispatch token to Redux

    // Fetch cart data from backend
    apiClient.get('/orders/cart/').then((response) => {
      response.data.items.forEach((item) => {
          store.dispatch(addItem({
            ...item,
            pricePerUnit: parseFloat(item.pricePerUnit), // Convert to number
        }));
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);