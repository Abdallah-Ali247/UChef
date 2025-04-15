import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const CustomizeMealPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState({});

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

    const handleIngredientChange = (id, quantity) => {
        setSelectedIngredients({ ...selectedIngredients, [id]: quantity });
    };
    
    const addToCart = async () => {
        try {
            // Construct the ingredients array correctly
            const ingredientsData = Object.keys(selectedIngredients).map((id) => ({
                ingredient: parseInt(id), // Ensure the ID is an integer
                quantity: parseFloat(selectedIngredients[id]), // Convert to a number
            }));
    
            // Send the correct payload to the backend
            await apiClient.post('/restaurants/cart/add/', { 
                ingredients: ingredientsData, // Pass the array of ingredients
                is_custom: true 
            });
    
            alert('Custom meal added to cart!');
        } catch (error) {
            console.error('Error adding custom meal to cart:', error);
        }
    };

    return (
        <div>
            <h2>Customize a New Meal</h2>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name} - ${ingredient.price_per_unit} per unit
                        <input
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Quantity"
                            onChange={(e) =>
                                handleIngredientChange(ingredient.id, e.target.value)
                            }
                        />
                    </li>
                ))}
            </ul>
            <button onClick={addToCart}>Add Custom Meal to Cart</button>
        </div>
    );
};

export default CustomizeMealPage;