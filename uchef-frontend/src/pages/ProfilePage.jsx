import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiClient.get('/users/profile/');
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Profile</h2>
            {profile ? (
                <pre>{JSON.stringify(profile, null, 2)}</pre>
            ) : (
                <p>Unable to load profile data.</p>
            )}
        </div>
    );
};

export default ProfilePage;