import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const ManageIngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [newIngredient, setNewIngredient] = useState({ name: '', price_per_unit: '', stock_quantity: '' });

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            const response = await apiClient.get('/restaurants/ingredients/');
            setIngredients(response.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    const handleAddIngredient = async () => {
        try {
            await apiClient.post('/restaurants/ingredients/', newIngredient);
            fetchIngredients(); // Refresh the list of ingredients
            setNewIngredient({ name: '', price_per_unit: '', stock_quantity: '' }); // Reset form
        } catch (error) {
            console.error('Error adding ingredient:', error);
        }
    };

    const handleDeleteIngredient = async (ingredientId) => {
        try {
            await apiClient.delete(`/restaurants/ingredients/${ingredientId}/`);
            fetchIngredients(); // Refresh the list of ingredients
        } catch (error) {
            console.error('Error deleting ingredient:', error);
        }
    };

    return (
        <div>
            <h2>Manage Ingredients</h2>

            {/* Form to Add a New Ingredient */}
            <div>
                <h3>Add New Ingredient</h3>
                <input
                    type="text"
                    placeholder="Name"
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price Per Unit"
                    value={newIngredient.price_per_unit}
                    onChange={(e) => setNewIngredient({ ...newIngredient, price_per_unit: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={newIngredient.stock_quantity}
                    onChange={(e) => setNewIngredient({ ...newIngredient, stock_quantity: e.target.value })}
                />
                <button onClick={handleAddIngredient}>Add Ingredient</button>
            </div>

            {/* List of Ingredients */}
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name} - ${ingredient.price_per_unit} per unit - Stock: {ingredient.stock_quantity}
                        <button onClick={() => handleDeleteIngredient(ingredient.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageIngredientsPage;