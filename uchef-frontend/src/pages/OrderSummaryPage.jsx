import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cartSlice';
import apiClient from '../api/apiClient';
import { useNavigate } from 'react-router-dom';

const OrderSummaryPage = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Calculate total price
    const total = cart.reduce(
        (sum, item) => sum + item.pricePerUnit * item.weight * item.quantity,
        0
    );

    // Handle placing the order
    const handlePlaceOrder = async () => {
        try {
            // Prepare the order payload
            const orderPayload = {
                items: cart.map((item) => ({
                    menu_item: item.id, // Backend expects `menu_item`
                    weight: parseFloat(item.weight), // Ensure it's a number
                    quantity: parseInt(item.quantity, 10), // Ensure it's a number
                    price: (item.pricePerUnit * item.weight * item.quantity).toFixed(2), // Add price field
                })),
                total_price: total.toFixed(2), // Total price as a string
            };

            console.log('Order Payload:', JSON.stringify(orderPayload, null, 2)); // Debugging log

            // Send the order to the backend
            await apiClient.post('/orders/order/create/', orderPayload);

            // Clear the cart
            dispatch(clearCart());

            // Redirect to a confirmation page or home
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error.message);
            alert('Failed to place the order. Please try again.');
        }
    };

    return (
        <div>
            <h2>Order Summary</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty. Add items to your cart to place an order.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id}>
                                <strong>{item.name}</strong> - ${item.pricePerUnit.toFixed(2)} x {item.weight} kg x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${total.toFixed(2)}</p>
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </>
            )}
        </div>
    );
};

export default OrderSummaryPage;