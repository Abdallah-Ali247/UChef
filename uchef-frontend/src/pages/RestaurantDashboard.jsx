import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const RestaurantDashboard = () => {
    const [meals, setMeals] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mealsResponse = await apiClient.get('/restaurants/meals/');
                const ingredientsResponse = await apiClient.get('/restaurants/ingredients/');
                setMeals(mealsResponse.data);
                setIngredients(ingredientsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Restaurant Dashboard</h2>

            <h3>Menu Management</h3>
            <ul>
                {meals.map((meal) => (
                    <li key={meal.id}>
                        {meal.name} - ${meal.price.toFixed(2)} - {meal.description}
                    </li>
                ))}
            </ul>

            <h3>Stock Management</h3>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name} - ${ingredient.price_per_unit.toFixed(2)} per unit - Stock: {ingredient.stock_quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantDashboard;