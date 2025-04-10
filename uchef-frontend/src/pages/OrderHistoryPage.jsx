import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiClient.get('/orders/orders/');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <strong>Order #{order.id}</strong> - {new Date(order.created_at).toLocaleDateString()} (${order.total_price})
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.id}>
                                        {item.menu_item.name} - {item.quantity} x {item.weight} kg (${item.price})
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistoryPage;