import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const RestaurantListPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await apiClient.get('/restaurants/restaurants/');
                setRestaurants(response.data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Restaurants</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        <Link to={`/restaurants/${restaurant.id}`}>
                            {restaurant.name} 
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RestaurantListPage;