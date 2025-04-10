import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cartSlice';

const MenuPage = () => {
    const { id } = useParams(); // Get restaurant ID from URL
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // Single state object for all menu items
    const [customizations, setCustomizations] = useState({});

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await apiClient.get(`/restaurants/menu-items/?restaurant=${id}`);
                setMenuItems(response.data);

                // Initialize default customizations for each menu item
                const initialCustomizations = {};
                response.data.forEach((item) => {
                    initialCustomizations[item.id] = {
                        weight: 1.0, // Default weight
                        quantity: 1, // Default quantity
                    };
                });
                setCustomizations(initialCustomizations);
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {menuItems.map((item) => {
                    const { weight, quantity } = customizations[item.id];

                    return (
                        <li key={item.id}>
                            <strong>{item.name}</strong> - {item.description} (${item.price_per_unit})
                            <div>
                                <label>
                                    Weight (kg):
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        value={weight}
                                        onChange={(e) =>
                                            setCustomizations((prev) => ({
                                                ...prev,
                                                [item.id]: {
                                                    ...prev[item.id],
                                                    weight: e.target.value,
                                                },
                                            }))
                                        }
                                        style={{ marginLeft: '5px' }}
                                    />
                                </label>
                                <label style={{ marginLeft: '10px' }}>
                                    Quantity:
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) =>
                                            setCustomizations((prev) => ({
                                                ...prev,
                                                [item.id]: {
                                                    ...prev[item.id],
                                                    quantity: e.target.value,
                                                },
                                            }))
                                        }
                                        style={{ marginLeft: '5px' }}
                                    />
                                </label>
                                <button
                                    onClick={() => {
                                        const numericWeight = parseFloat(weight); // Convert to number
                                        const numericQuantity = parseInt(quantity, 10); // Convert to number

                                        // Dispatch the addItem action with the correct values
                                        dispatch(
                                            addItem({
                                                id: item.id,
                                                name: item.name,
                                                pricePerUnit: parseFloat(item.price_per_unit),
                                                weight: numericWeight,
                                                quantity: numericQuantity,
                                            })
                                        );
                                    }}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MenuPage;