import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
    return (
        <div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your order. Your meal will be prepared and delivered soon.</p>
            <Link to="/restaurants">Continue Shopping</Link>
        </div>
    );
};

export default OrderConfirmationPage;