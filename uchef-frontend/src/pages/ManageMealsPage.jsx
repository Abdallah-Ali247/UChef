import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const ManageMealsPage = () => {
    const [meals, setMeals] = useState([]);
    const [newMeal, setNewMeal] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchMeals();
    }, []);

    const fetchMeals = async () => {
        try {
            const response = await apiClient.get('/restaurants/meals/');
            setMeals(response.data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    const handleAddMeal = async () => {
        try {
            await apiClient.post('/restaurants/meals/', newMeal);
            fetchMeals(); // Refresh the list of meals
            setNewMeal({ name: '', description: '', price: '' }); // Reset form
        } catch (error) {
            console.error('Error adding meal:', error);
        }
    };

    const handleDeleteMeal = async (mealId) => {
        try {
            await apiClient.delete(`/restaurants/meals/${mealId}/`);
            fetchMeals(); // Refresh the list of meals
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    return (
        <div>
            <h2>Manage Meals</h2>

            {/* Form to Add a New Meal */}
            <div>
                <h3>Add New Meal</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newMeal.description}
                    onChange={(e) => setNewMeal({ ...newMeal, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newMeal.price}
                    onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
                />
                <button onClick={handleAddMeal}>Add Meal</button>
            </div>

            {/* List of Meals */}
            <ul>
                {meals.map((meal) => (
                    <li key={meal.id}>
                        {meal.name} - ${meal.price} - {meal.description}
                        <button onClick={() => handleDeleteMeal(meal.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageMealsPage;