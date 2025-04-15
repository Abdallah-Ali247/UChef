import React, { useEffect, useState, useRef} from 'react';
import apiClient from '../api/apiClient';


const OrderMealsPage = () => {
    const [meals, setMeals] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const quantityRefs = useRef({});

    useEffect(() => {
        fetchMeals();
        fetchCart();
    }, []);

    const fetchMeals = async () => {
        try {
            const response = await apiClient.get('/restaurants/meals/');
            setMeals(response.data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await apiClient.get('restaurants/cart/');
            setCartItems(response.data.items);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (mealId, quantity) => {
        try {
            await apiClient.post('/restaurants/cart/add/', { 
                meal: mealId, 
                quantity: parseInt(quantity, 10),
                is_custom: false // Explicitly set is_custom to false for normal meals
            });
            fetchCart(); // Refresh the cart
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div>
            <h2>Order Meals</h2>
            <ul>
                {meals.map((meal) => (
                    <li key={meal.id}>
                        {meal.name} - ${meal.price}
                        <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            ref={(el) => (quantityRefs.current[meal.id] = el)}
                        />
                        <button onClick={() => {
                            const qty = quantityRefs.current[meal.id]?.value || 1;
                            addToCart(meal.id, parseInt(qty, 10));
                        }}>Add to Cart</button>
                    </li>
                ))}
            </ul>

            <h3>Your Cart</h3>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.meal ? item.meal.name : 'Custom Meal'} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderMealsPage;